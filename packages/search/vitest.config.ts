import { baseConfig, mergeConfig } from '@erecruitment/testkit';

export default mergeConfig(baseConfig, {
  test: {
    coverage: {
      exclude: ['src/index.ts', 'src/interface'],
    },
  },
});
