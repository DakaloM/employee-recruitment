import { defineConfig, options } from '@erecruitment/buildkit';

const external = options.external.concat(['vite-tsconfig-paths']);

export default defineConfig({
  ...options,
  external,
});
