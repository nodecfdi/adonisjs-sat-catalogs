import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    entry: ['index.ts', 'commands/create_or_update_sat_catalogs_db.ts'],
    outDir: 'build',
    shims: true,
    format: ['esm'],
    target: 'esnext',
    platform: 'node',
    exports: {
      customExports(pkg, _context) {
        pkg['./commands'] = './build/commands/main.js';

        return pkg;
      },
    },
    unbundle: true,
  },
]);
