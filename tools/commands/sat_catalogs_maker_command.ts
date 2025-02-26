import { Buffer } from 'node:buffer';
import { exec } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import { BaseCommand } from '@adonisjs/ace';
import { getDirname } from '@adonisjs/core/helpers';
import { deleteAsync } from 'del';

const execAsync = promisify(exec);

export default class SatCatalogsMakerCommand extends BaseCommand {
  public static readonly commandName = 'sat-catalogs-maker';

  public static readonly description = 'Download and make models of sat catalogs';

  public async run(): Promise<void> {
    const { tmpPath, modelsPath, clean } = this.getPathsAndCleanFn();
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
  }

  private async decompressFile(inputPath: string): Promise<void> {
    await execAsync(`bunzip2 ${inputPath}`);
  }

  private async downloadFile(url: string, outputPath: string): Promise<void> {
    const responseRaw = await fetch(url);
    const rawBuffer = await responseRaw.arrayBuffer();
    await writeFile(outputPath, Buffer.from(rawBuffer));
  }

  // eslint-disable-next-line @typescript-eslint/method-signature-style
  private getPathsAndCleanFn(): { tmpPath: string; modelsPath: string; clean: (targetPath: string) => Promise<void> } {
    const rootPath = path.join(getDirname(import.meta.url), '..', '..');
    const modelsPath = path.join(rootPath, 'src', 'models');
    const tmpPath = path.join(rootPath, 'tmp');

    const clean = async (targetPath: string) => {
      await deleteAsync(targetPath);
    };

    return { tmpPath, modelsPath, clean };
  }
}
