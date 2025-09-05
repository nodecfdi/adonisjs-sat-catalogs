import type { BaseModel } from '@adonisjs/lucid/orm';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { getDirname } from '@adonisjs/core/helpers';
import string from '@adonisjs/core/helpers/string';
import { test } from '@japa/runner';
import { getRawConnection } from './_helpers/test_utils.js';

test.group('Generation models', () => {
  test('models generated are the same as the catalogs', async ({ assert }) => {
    const rawDb = getRawConnection();
    const srcDir = await readdir(path.join(getDirname(import.meta.url), '..', 'src'));
    const allTables = rawDb
      .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name")
      .all() as { name: string }[];

    assert.notEmpty(allTables);
    assert.notEmpty(srcDir);
    assert.equal(srcDir.length, allTables.length);

    for (const table of allTables) {
      const tableName = table.name;
      const expectedFileName = `${string.snakeCase(tableName)}.ts`;

      assert.include(srcDir, expectedFileName);
    }
  }).timeout(60000);

  test('models generated as all columns as the database', async ({ assert }) => {
    const rawDb = getRawConnection();
    const allTables = rawDb
      .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name")
      .all() as { name: string }[];

    for (const table of allTables) {
      const targetFile = path.join(getDirname(import.meta.url), '..', 'src', `${string.snakeCase(table.name)}.ts`);
      const module = (await import(targetFile)) as { default: typeof BaseModel };
      const Model = module.default;

      assert.equal(Model.name, string.pascalCase(table.name));
      assert.equal(Model.connection, 'satcatalogs');
      assert.equal(Model.table, table.name);

      const columnsNamesInModel = Model.$columnsDefinitions
        .values()
        .map((c) => c.columnName)
        .toArray();
      const columnsInfo = rawDb.prepare(`PRAGMA table_info(${table.name})`).all() as {
        name: string;
        type: string;
        notnull: 0 | 1;
        pk: 0 | 1;
      }[];
      const columnsInTable = columnsInfo.map((c) => c.name);

      assert.notEmpty(columnsNamesInModel);
      assert.notEmpty(columnsInTable);
      assert.equal(columnsNamesInModel.length, columnsInTable.length);
      assert.deepEqual(columnsInTable, columnsNamesInModel);
    }
  }).timeout(60000);
});
