'use strict'
const fs = require('fs')
const path = require('path')
const jsonfile = require('jsonfile')

const HOMEDIR = require('os').homedir()
const APIKEY_NAME = '.gtranslate'
const KEY_PATH = path.join(HOMEDIR, APIKEY_NAME)

var conf = null

var methods = {
  get: function () {
    try {
      conf = jsonfile.readFileSync(KEY_PATH)
    } catch (e) {
      // init file
      jsonfile.writeFileSync(KEY_PATH, {})
    }
    return conf || {}
  },
  getKey: function() {
    var c = methods.get()
    return c.key
  },
  setKey: function (key) {
    if (!key) exit('Provide a valid API KEY!', 1)
    jsonfile.writeFileSync(KEY_PATH, {key: key}, {flag: 'a'})
  },
  setTargetLang: function (tLang, googleTranslate) {
    googleTranslate.getSupportedLanguages(function(err, languageCodes) {
      if (languageCodes.indexOf(tLang.toLowerCase()) === -1) {
        exit('Provide a valid Target language!', 1)
      } else {
        jsonfile.writeFileSync(KEY_PATH, {target: tLang.toLowerCase()}, {flag: 'a'})
      }
    })

  }
}

module.exports = methods

function exit(msg, code) {
  console.log(msg)
  process.exit(code || 0)
}
