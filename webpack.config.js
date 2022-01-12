const { WebpackConfigBuilder } = require('@arthur.eudeline/build-kit');
const { join } = require('path');

const config = WebpackConfigBuilder()
  .setOutputPath({
    absolute: join(__dirname, './dist'),
    relative: './dist'
  })
  // Entries
  .addEntry(
    join(__dirname, './lib/index.ts'),
    'index'
  )
  .addEntry(
    join(__dirname, './lib/assets/css/classic.scss'),
    'css/classic'
  )
  // Dev server
  .addDevServerStatic({
    directory: join(__dirname, 'demo'),
    publicPath: '/',
  })
  .enableOutputCleaning(true)
  .build();

module.exports = config;