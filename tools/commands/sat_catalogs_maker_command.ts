import { Buffer } from 'node:buffer';
import { exec } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import { BaseCommand } from '@adonisjs/ace';
import { getDirname } from '@adonisjs/core/helpers';
import string from '@adonisjs/core/helpers/string';
// eslint-disable-next-line import-x/no-named-as-default
import Database from 'better-sqlite3';
import { deleteAsync } from 'del';

const execAsync = promisify(exec);

export default class SatCatalogsMakerCommand extends BaseCommand {
  public static readonly commandName = 'sat-catalogs-maker';

  public static readonly description = 'Download and make models of sat catalogs';

  public async run(): Promise<void> {
    const { rootPath, tmpPath, modelsPath, stubsPath, clean } = this.getPathsAndCleanFn();
    await clean(tmpPath);
    await clean(modelsPath);
    this.logger.info('Creating tmp directory');
    await mkdir(tmpPath);
    this.logger.info('Creating models directory');
    await mkdir(modelsPath);

    // Start process downloading
    const actionDownload = this.logger.action('Downloading catalogs.db.bz2');
    try {
      await this.downloadFile(
        'https://github.com/phpcfdi/resources-sat-catalogs/releases/latest/download/catalogs.db.bz2',
        path.join(tmpPath, 'catalogs.db.bz2'),
      );
      actionDownload.displayDuration().succeeded();
    } catch (error) {
      await clean(tmpPath);
      actionDownload.failed(error as Error);

      return;
    }

    // Decompress file bz2
    const actionDecompress = this.logger.action('Decompressing catalogs.db.bz2');
    try {
      await this.decompressFile(path.join(tmpPath, 'catalogs.db.bz2'));
      actionDecompress.displayDuration().succeeded();
    } catch (error) {
      await clean(tmpPath);
      actionDecompress.failed(error as Error);

      return;
    }

    // Start process populating
    const actionPopulate = this.logger.action('Generate models from catalogs.db');
    try {
      await this.generateModelsFromCatalogsDb(path.join(tmpPath, 'catalogs.db'), modelsPath, stubsPath, rootPath);
      actionPopulate.displayDuration().succeeded();
    } catch (error) {
      await clean(tmpPath);
      actionPopulate.failed(error as Error);

      return;
    }

    const applyPrettier = this.logger.action('Apply formatter using prettier');
    await execAsync(`pnpm prettier --write ${modelsPath}`);
    applyPrettier.displayDuration().succeeded();

    await clean(tmpPath);
  }

  private async generateModelsFromCatalogsDb(
    catalogDbPath: string,
    modelsPath: string,
    stubsPath: string,
    rootPath: string,
  ): Promise<void> {
    const baseModel = await readFile(path.join(stubsPath, 'sat_catalog.stub'), 'utf8');
    const propertyColumn = await readFile(path.join(stubsPath, 'column_property.stub'), 'utf8');

    const db = new Database(catalogDbPath);
    db.pragma('journal_mode = WAL');
    const allTables = db
      .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name")
      .all() as { name: string }[];
    this.logger.info(`Found ${allTables.length} tables`);
    const elementExport: { className: string; filePath: string }[] = [];

    for (const table of allTables) {
      const tableName = table.name;
      this.logger.info(`Generating model for ${tableName}`);
      const tableInfo = db.prepare(`PRAGMA table_info(${tableName})`).all() as {
        name: string;
        type: string;
        notnull: 0 | 1;
        pk: 0 | 1;
      }[];

      const propertiesColumns: string[] = [];
      for (const column of tableInfo) {
        const columnName = column.name;
        const columnType = column.type;
        const isNullable = column.notnull === 0;
        const isPrimary = column.pk === 1;
        if (columnType === 'TEXT') {
          propertiesColumns.push(
            string.interpolate(propertyColumn, {
              name: string.camelCase(columnName),
              type: isNullable ? 'string | null' : 'string',
              additionalProperties: isPrimary ? '{ isPrimary: true }' : '',
            }),
          );
        } else if (columnType === 'INT') {
          let typeColumn = 'number';
          const result = db.prepare(`select distinct ${columnName} from ${tableName}`).all() as Record<
            string,
            string | number
          >[];
          if (result.some((r) => typeof r[columnName] !== 'number')) {
            typeColumn = `${typeColumn} | ''`;
          }

          propertiesColumns.push(
            string.interpolate(propertyColumn, {
              name: string.camelCase(columnName),
              type: isNullable ? `${typeColumn} | null` : typeColumn,
              additionalProperties: isPrimary ? '{ isPrimary: true }' : '',
            }),
          );
        } else {
          this.logger.error(`Column ${columnName} with type ${columnType} is not supported`);
        }
      }

      const modelPath = path.join(modelsPath, `${string.snakeCase(tableName)}.ts`);
      await writeFile(
        modelPath,
        string.interpolate(baseModel, {
          name: string.pascalCase(tableName),
          table: tableName,
          properties: propertiesColumns.length === 0 ? '' : propertiesColumns.join('\n'),
        }),
      );
      elementExport.push({
        className: string.pascalCase(tableName),
        filePath: modelPath.replace(rootPath, '.').replace('.ts', '.js'),
      });
    }

    await writeFile(
      path.join(rootPath, 'index.ts'),
      `${elementExport
        .map(({ className, filePath }) => `export { default as ${className} } from '${filePath}';`)
        .join('\n')}\n`,
    );

    db.close();
  }

  private async decompressFile(inputPath: string): Promise<void> {
    await execAsync(`bunzip2 ${inputPath}`);
  }

  private async downloadFile(url: string, outputPath: string): Promise<void> {
    const responseRaw = await fetch(url);
    const rawBuffer = await responseRaw.arrayBuffer();
    await writeFile(outputPath, Buffer.from(rawBuffer));
  }

  private getPathsAndCleanFn() {
    const rootPath = path.join(getDirname(import.meta.url), '..', '..');
    const modelsPath = path.join(rootPath, 'src');
    const stubsPath = path.join(rootPath, 'tools', 'stubs');
    const tmpPath = path.join(rootPath, 'tmp');

    const clean = async (targetPath: string) => {
      await deleteAsync(targetPath);
    };

    return { rootPath, tmpPath, modelsPath, stubsPath, clean };
  }
}
