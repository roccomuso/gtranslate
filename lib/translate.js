'use strict'
const fs = require('fs')
const path = require('path')

const HOMEDIR = require('os').homedir()
const APIKEY_NAME = '.gtranslate.key'
const KEY_PATH = path.join(HOMEDIR, APIKEY_NAME)

if (fs.stat(KEY_PATH)){
  // TODO
}
