import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { Emitter } from '@adonisjs/core/events';
import { AppFactory } from '@adonisjs/core/factories/app';
import { LoggerFactory } from '@adonisjs/core/factories/logger';
import { getDirname } from '@adonisjs/core/helpers';
import { Database } from '@adonisjs/lucid/database';
import { BaseModel } from '@adonisjs/lucid/orm';
import { getActiveTest } from '@japa/runner';
import DatabaseSQ, { type Database as BetterSQLiteDatabase } from 'better-sqlite3';

export const createConnection = async function (): Promise<Database> {
  const test = getActiveTest();
  if (!test) {
    throw new Error('No test is currently running');
  }

  await mkdir(test.context.fs.basePath);

  const app = new AppFactory().create(test.context.fs.baseUrl);
  const logger = new LoggerFactory().create();
  const emitter = new Emitter(app);
  const db = new Database(
    {
      connection: 'satcatalogs',
      connections: {
        satcatalogs: {
          client: 'better-sqlite3',
          connection: {
            filename: path.join(getDirname(import.meta.url), '..', '_files', 'catalogs.db'),
            options: {
              // @ts-expect-error - option not in types but is in better-sqlite3
              readonly: true,
            },
          },
        },
      },
    },
    logger,
    emitter,
  );

  test.cleanup(() => db.manager.closeAll());
  BaseModel.useAdapter(db.modelAdapter());

  db.connection('satcatalogs').raw('PRAGMA journal_mode=DELETE');

  return db;
};

export const getRawConnection = function (): BetterSQLiteDatabase {
  const test = getActiveTest();
  if (!test) {
    throw new Error('No test is currently running');
  }

  const db = new DatabaseSQ(path.join(getDirname(import.meta.url), '..', '_files', 'catalogs.db'));
  db.pragma('journal_mode=DELETE');

  test.cleanup(() => {
    db.close();
  });

  return db;
};
