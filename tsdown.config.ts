import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    entry: ['index.ts', 'commands/create_or_update_sat_catalogs_db.ts'],
    shims: true,
    format: ['esm'],
    target: 'esnext',
    platform: 'node',
    exports: true,
    unbundle: true,
  },
]);
