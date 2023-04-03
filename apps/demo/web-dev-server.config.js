import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fromRollup } from '@web/dev-server-rollup';
import path from 'node:path';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';

const tsPaths = fromRollup(typescriptPaths);

const tsconfigPath = path.resolve('./tsconfig.json');

export default /** @type {import("@web/dev-server").DevServerConfig} */ ({
  rootDir: './',
  clearTerminalOnReload: true,
  appIndex: 'index.html',
  watch: true,
  debug: true,
  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },
  plugins: [
    tsPaths({
      preserveExtensions: true,
    }),
    // cssTransformPlugin(),
    esbuildPlugin({
      json: true,
      ts: true,
      tsconfig: tsconfigPath,
    }),
  ],
});
