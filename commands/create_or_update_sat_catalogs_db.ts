import { Buffer } from 'node:buffer';
import { access, constants, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { BaseCommand, flags } from '@adonisjs/core/ace';
import { type CommandOptions } from '@adonisjs/core/types/ace';
import DbSqlite3 from 'better-sqlite3';
import { deleteAsync } from 'del';
import unzipper from 'unzipper';

export default class CreateOrUpdateSatCatalogsDb extends BaseCommand {
  public static readonly commandName = 'sat-catalogs:create-update';

  public static readonly description =
    'Download sources from phpcfdi/resources-sat-catalogs and create or update a sqlite3 database';

  public static readonly help = [
    'This command will download the sources from phpcfdi/resources-sat-catalogs and create or update a sqlite3 database',
    '',
    'The database will be created in the config database connection satcatalogs filepath',
    'or in the destination directory if provided with the --destination flag.',
    'If the destination flag is directory, will use it as destination/satcatalogs.db',
    'If the destination flag is a file, will use it as destination and create a database with the same name',
    '',
    'If flag --override is provided, will delete the database if exists and create a new one',
  ];

  public static readonly options: CommandOptions = {
    startApp: true,
  };

  @flags.string({
    description: 'Directory or filename to place the database',

    required: false,
  })
  declare public destination?: string;

  @flags.boolean({
    description: 'Delete the database if exists and create a new one',
    required: false,
  })
  declare public override?: boolean;

  public prepare() {
    this.app.terminating(async () => {
      const tmpPath = this.app.tmpPath('satcatalogs');

      const cleaningTmp = this.logger.action('Cleaning tmp satcatalogs directory');
      await deleteAsync(tmpPath);
      cleaningTmp.displayDuration().succeeded();
    });
  }

  public async run() {
    let destinationDirOrFile =
      this.destination ?? this.app.config.get<string>('database.connections.satcatalogs.connection.filename', './');
    if (
      !destinationDirOrFile.endsWith('.db') &&
      !destinationDirOrFile.endsWith('.sqlite') &&
      !destinationDirOrFile.endsWith('.sqlite3')
    ) {
      destinationDirOrFile = path.join(destinationDirOrFile, 'satcatalogs.db');
    }

    const fileExists = await this.fileExists(destinationDirOrFile);
    if (fileExists && this.override) {
      await deleteAsync(destinationDirOrFile);
    }

    const tmpPath = this.app.tmpPath('satcatalogs');
    if (!(await this.fileExists(tmpPath))) {
      await mkdir(tmpPath, { recursive: true });
    }

    const zipFilePath = path.join(tmpPath, 'resources-sat-catalogs.zip');
    const versionFilePath = path.join(tmpPath, 'satcatalogs_version.txt');

    const resourceZip = 'https://github.com/phpcfdi/resources-sat-catalogs/archive/master.zip';
    const versionFile = 'https://raw.githubusercontent.com/phpcfdi/resources-sat-catalogs/master/database/version.txt';

    try {
      const versionAction = this.logger.action('Obtaining latest version of phpcfdi/resources-sat-catalogs');
      const onlineVersionFileExists = await this.downloadFile(versionFile, versionFilePath);
      if (!onlineVersionFileExists) {
        versionAction.displayDuration().failed('Error downloading version file');
        this.terminate();

        return;
      }
      versionAction.displayDuration().succeeded();

      const onlineVersion = await readFile(versionFilePath, 'utf8');
      const rootDatabasePath = path.dirname(destinationDirOrFile);
      const localVersionFilePath = path.join(rootDatabasePath, 'satcatalogs_version.txt');
      const localVersionFileExists = await this.fileExists(localVersionFilePath);
      if (localVersionFileExists) {
        const localVersion = await readFile(localVersionFilePath, 'utf8');

        if (localVersion === onlineVersion) {
          this.logger.info('Database is up to date');
          this.logger.info('No need to update');
          this.terminate();

          return;
        }

        this.logger.info(`Database is outdated and will be updated to the version ${onlineVersion}`);
      }

      const zipActionDownload = this.logger.action('Downloading phpcfdi/resources-sat-catalogs');
      const zipFileExists = await this.downloadFile(resourceZip, zipFilePath);
      if (!zipFileExists) {
        zipActionDownload.displayDuration().failed('Error downloading phpcfdi/resources-sat-catalogs');
        this.terminate();

        return;
      }
      zipActionDownload.displayDuration().succeeded();

      const zipDecompressAction = this.logger.action('Decompressing phpcfdi/resources-sat-catalogs');
      const zipDecompressPath = path.join(tmpPath, 'resources-sat-catalogs-master', 'database');
      const zipFileDecompressExists = await this.decompressFile(zipFilePath, tmpPath);
      if (!zipFileDecompressExists) {
        zipDecompressAction.displayDuration().failed('Error decompressing phpcfdi/resources-sat-catalogs');
        this.terminate();

        return;
      }
      zipDecompressAction.displayDuration().succeeded();

      const createOrUpdateDatabaseAction = this.logger.action(
        `${localVersionFileExists} ? Updating database : Creating database`,
      );
      const result = await this.createOrUpdateDatabase(destinationDirOrFile, zipDecompressPath);
      if (!result) {
        createOrUpdateDatabaseAction.displayDuration().failed('Error creating or updating database');
        this.terminate();

        return;
      }

      await writeFile(localVersionFilePath, onlineVersion);
      createOrUpdateDatabaseAction.displayDuration().succeeded();

      this.logger.info(`Database successfully updated to version ${onlineVersion}`);
      this.logger.success('Database is ready to use');
    } catch (error) {
      this.logger.error('Error executing command sat-catalogs:create-update');
      this.error = error;
      this.exitCode = 1;
    }
  }

  public async completed() {
    if (this.error) {
      this.logger.error((this.error as Error).message);

      /**
       * Notify Ace that error has been handled
       */
      return true;
    }
  }

  private async createOrUpdateDatabase(destinationDirOrFile: string, zipDecompressPath: string): Promise<boolean> {
    try {
      const db = new DbSqlite3(destinationDirOrFile);
      const schemaFiles = await readdir(path.join(zipDecompressPath, 'schemas'));
      const dataFiles = await readdir(path.join(zipDecompressPath, 'data'));

      for (const schemaFile of schemaFiles) {
        const schemaFilePath = path.join(zipDecompressPath, 'schemas', schemaFile);
        const schema = await readFile(schemaFilePath, 'utf8');
        db.exec(schema);
      }

      for (const dataFile of dataFiles) {
        const dataFilePath = path.join(zipDecompressPath, 'data', dataFile);
        const data = await readFile(dataFilePath, 'utf8');
        db.exec(data);
      }

      db.close();

      return true;
    } catch (error) {
      this.logger.error(`Error creating database ${destinationDirOrFile}`);
      this.logger.error((error as Error).message);

      return false;
    }
  }

  private async decompressFile(inputPath: string, outputDirPath: string): Promise<boolean> {
    try {
      const destination = await unzipper.Open.file(inputPath);
      await destination.extract({ path: outputDirPath });

      return true;
    } catch (error) {
      this.logger.error(`Error decompressing file ${inputPath}`);
      this.logger.error((error as Error).message);

      return false;
    }
  }

  private async downloadFile(url: string, outputPath: string): Promise<boolean> {
    try {
      const responseRaw = await fetch(url);
      const rawBuffer = await responseRaw.arrayBuffer();
      await writeFile(outputPath, Buffer.from(rawBuffer));

      return true;
    } catch (error) {
      this.logger.error(`Error downloading file ${url}`);
      this.logger.error((error as Error).message);
      this.logger.error('Please assert that the internet is available');

      return false;
    }
  }

  private async fileExists(file: string): Promise<boolean> {
    try {
      await access(file, constants.F_OK);

      return true;
    } catch {
      return false;
    }
  }
}
