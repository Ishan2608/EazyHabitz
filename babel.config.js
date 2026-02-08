module.exports = function (api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        [
          'module-resolver',
          {
            root: ['.'],
            alias: {
              // Keep this
              '@': './',
              
              // Add these
              '@components': './components',
              '@services': './services',
              '@types': './types',
              '@utils': './utils',
              '@hooks': './hooks',
              '@assets': './assets',
              '@config': './config',
              '@constants': './constants',
              '@context': './context',
            },
          },
        ],
      ],
    };
  };