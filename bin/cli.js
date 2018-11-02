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

var googleTranslate = require('google-translate')(API_KEY)

if (argv.st) {
  config.setTargetLang(argv.st, googleTranslate)
  exit(boxen('\u2714 Target lang set!', {align: 'center', borderColor: 'green', padding: 1, margin: 1}), 0)
}

googleTranslate.translate(argv.text, argv.source, argv.target || config.getTargetLang(), function (err, translation) {
  if (err) return exitWithError(err)
  var translatedText = translation.translatedText
  var sourceLanguage = translation.detectedSourceLanguage || argv.source
  var targetLanguage = translation.targetLanguage || argv.target
  if (argv.b) {
    process.stdout.write(translatedText)
  } else {
    console.log(boxen(`${sourceLanguage} \u2192 ${targetLanguage}\n\n${translatedText} `, {align: 'center', borderColor: 'green', padding: 1, margin: 1}))
  }
})

function exit (msg, code) {
  console.log(msg)
  process.exit(code || 0)
}

// tests which kind of error occured and handles correctly
// in case for example we get a status 403 from the API this will have
// an error and a body inside the error that we should display
// can be reproduced by using an invalid key or a key without persmissions
function exitWithError (err) {
  var hasErrorBody = err['response'] && err['response']['body']
  if (!hasErrorBody) return exit(err, 1)

  var body = JSON.parse(err['response']['body'])
  var hasMessage = body['error'] && body['error']['message']
  if (!hasMessage) return exit(body, 1)

  var message = body['error']['message']
  return exit(message, 1)
}
