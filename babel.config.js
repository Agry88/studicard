module.exports = function(api) {
  plugins: [
    'babel-plugin-styled-components',
    'react-native-reanimated/plugin'
  ],
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
    ],
  };
};
