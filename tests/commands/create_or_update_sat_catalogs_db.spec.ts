import path from 'node:path';
import { AceFactory } from '@adonisjs/core/factories';
import { test } from '@japa/runner';
import CreateOrUpdateSatCatalogsDb from '../../commands/create_or_update_sat_catalogs_db.js';

test.group('CreateOrUpdateSatCatalogsDb', () => {
  test('create without destination', async ({ fs, assert }) => {
    const ace = await new AceFactory().make(fs.baseUrl, {
      importer: () => {
        /** empty */
      },
    });
    await ace.app.init();
    await ace.app.boot();
    ace.ui.switchMode('raw');

    ace.app.config.set(
      'database.connections.satcatalogs.connection.filename',
      path.join(fs.basePath, 'satcatalogs.db'),
    );
    const command = await ace.create(CreateOrUpdateSatCatalogsDb, []);
    await command.run();

    await assert.fileExists('satcatalogs.db');
    await assert.fileExists('satcatalogs_version.txt');
    await assert.fileIsNotEmpty('satcatalogs_version.txt');
    command.assertLog('[ green(success) ] Database is ready to use');
  }).timeout(60000);
});
