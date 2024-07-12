import { options, defineConfig } from '@erecruitment/buildkit';

export default defineConfig({
  ...options,
  external: options.external.concat(['pg', 'knex', 'objection']),
});
