const argv = require('yargs')
  .usage('Autodetect: gtranslate -t [IT] <text>')
  .usage('Usage: gtranslate -s [EN] -t [IT] <text>')
  .help('help')
  .alias('help', 'h')
  .option('register', {
    alias: 'r',
    describe: 'Set a new Google Translate API KEY',
    type: 'string'
  })
  .option('source', {
    alias: 's',
    describe: 'Source language',
    type: 'string'
  })
  .option('target', {
    alias: 't',
    describe: 'Target language',
    type: 'string'
  })
  .option('set-target', {
    alias: 'st',
    describe: 'Set default target language',
    type: 'string'
  })
  .option('brief', {
    alias: 'b',
    describe: 'Brief output, only showing translation',
    type: 'boolean'
  })
  .example('gtranslate --register <API_KEY>', 'Set a new Google Translate API KEY')
  .example('gtranslate <text>', 'Language autodetect and default target language')
  .example('gtranslate -t en <text>', 'Basic translation with source language autodetect')
  .example('gtranslate -s it -t en <text>', 'Provide a source language')
  .example('gtranslate --set-target it', 'Set a default target language [EN by default]')
  .epilogue('@Author: Rocco Musolino - github.com/roccomuso/gtranslate - @Copyright 2017')
  .argv

argv.text = argv._.join(' ')

module.exports = argv
