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
    join(__dirname, './lib/browser.ts'),
    'browser'
  )
  // Dev server
  .addDevServerStatic({
    directory: join(__dirname, 'demo'),
    publicPath: '/',
  })
  .enableOutputCleaning(true)
  .enableFilenamesHash(false)
  .enableOptimization(false)
  .enableTypescriptDeclaration(true)
  .build();

// Used for exporting in the bundle file and making it importable by others projects
config.output.libraryTarget = "commonjs";

module.exports = config;