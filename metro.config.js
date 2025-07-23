const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};


// 1. Get the default Metro configuration.
const defaultConfig = getDefaultConfig(__dirname);

// 2. Merge your custom configuration with the default.
const mergedConfig = mergeConfig(defaultConfig, config);

// 3. Wrap the final configuration with Reanimated's wrapper.
module.exports = wrapWithReanimatedMetroConfig(mergedConfig);
