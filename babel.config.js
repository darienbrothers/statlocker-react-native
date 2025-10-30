module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Minimal plugin set to isolate the error source
    plugins: [
      'react-native-reanimated/plugin', // must be last
    ],
  };
};

