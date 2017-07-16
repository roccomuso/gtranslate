#!/usr/bin/env node
'use strict'
const boxen = require('boxen')
var argv = require('../lib/argv')
var config = require('../lib/config')

var API_KEY = config.getKey()

if (!API_KEY && !argv.register) {
  exit(boxen('Missing API_KEY for google translate.\nUse the --register option', {align: 'center', borderColor: 'red', padding: 1, margin: 1}), 1)
}

if (argv.register) {
  config.setKey(argv.register)
  exit(boxen('\u2714 KEY stored!', {align: 'center', borderColor: 'green', padding: 1, margin: 1}), 0)
}

if (argv.st) {
  config.setTargetLang(argv.st)
  exit(boxen('\u2714 Target lang set!', {align: 'center', borderColor: 'green', padding: 1, margin: 1}), 0)
}

var googleTranslate = require('google-translate')(API_KEY)

googleTranslate.translate(argv.text, argv.source, argv.target || config.getTargetLang(), function (err, translation) {
  if (err) return exit(err.message, 1)
  var translatedText = translation.translatedText
  var sourceLanguage = translation.detectedSourceLanguage || argv.source
  var targetLanguage = translation.targetLanguage
  console.log(boxen(`${sourceLanguage} \u2192 ${targetLanguage}\n\n${translatedText} `, {align: 'center', borderColor: 'green', padding: 1, margin: 1}))
})

function exit (msg, code) {
  console.log(msg)
  process.exit(code || 0)
}
