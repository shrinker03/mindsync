const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

/**
 * Metro needs explicit watchFolders for pnpm workspaces: the default only
 * watches the project root, so imports from `@mind-sync/shared` (resolved
 * via a pnpm symlink to `../packages/shared`) won't update on edit.
 */
const config = {
  watchFolders: [
    workspaceRoot,
    path.resolve(workspaceRoot, 'packages/shared'),
  ],
  resolver: {
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(workspaceRoot, 'node_modules'),
    ],
    disableHierarchicalLookup: false,
  },
};

module.exports = mergeConfig(getDefaultConfig(projectRoot), config);
