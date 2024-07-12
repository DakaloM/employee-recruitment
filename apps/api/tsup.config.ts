import { options, defineConfig } from '@erecruitment/buildkit';

export default defineConfig({
  ...options,
  dts: false,
  external: options.external.concat(['esbuild', '@erecruitment/testkit']),
  format: ['cjs'],
  entry: ['src/index.ts', 'db/**/*.ts'],
});
