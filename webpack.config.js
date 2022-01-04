const { WebpackConfigBuilder } = require('@arthur.eudeline/build-kit');
const { join } = require('path');

const config = WebpackConfigBuilder()
  .setOutputPath( join(__dirname, './dist') )
  .enableFilenamesHash(false)
  .enableAssetFile(false)
  .addEntry(
    join(__dirname, './lib/index.ts'),
    'index'
  )
  .build();

module.exports = config;