import eienjs from '@eienjs/eslint-config';

export default eienjs({
  ignores: ['docs'],
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
}).append({
  files: ['ace.js', 'tools/main.ts'],
  rules: {
    'antfu/no-top-level-await': 'off',
  },
}, {
  files: ['commands/**/*.ts'],
  rules: {
    '@typescript-eslint/require-await': 'off',
  },
});
