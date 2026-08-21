#!/usr/bin/env node
'use strict'
const boxen = require('boxen')
const argv = require('../lib/argv')
const config = require('../lib/config')

const API_KEY = config.getKey()

if (!API_KEY && !argv.register) {
  exit(boxen('Missing API_KEY for google translate.\nUse the --register option', { align: 'center', borderColor: 'red', padding: 1, margin: 1 }), 1)
}

if (argv.register) {
  config.setKey(argv.register)
  exit(boxen('✔ KEY stored!', { align: 'center', borderColor: 'green', padding: 1, margin: 1 }), 0)
}

const googleTranslate = require('../lib/google-translate')(API_KEY)

if (argv.st) {
  config.setTargetLang(argv.st, googleTranslate)
  exit(boxen('✔ Target lang set!', { align: 'center', borderColor: 'green', padding: 1, margin: 1 }), 0)
}

googleTranslate.translate(argv.text, argv.source, argv.target || config.getTargetLang(), (err, translation) => {
  if (err) return exitWithError(err)
  const translatedText = translation.translatedText
  const sourceLanguage = translation.detectedSourceLanguage || argv.source
  const targetLanguage = translation.targetLanguage || argv.target
  if (argv.b) {
    process.stdout.write(translatedText)
  } else {
    console.log(boxen(`${sourceLanguage} → ${targetLanguage}\n\n${translatedText} `, { align: 'center', borderColor: 'green', padding: 1, margin: 1 }))
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
  const hasErrorBody = err.response && err.response.body
  if (!hasErrorBody) return exit(err, 1)

  const body = JSON.parse(err.response.body)
  const hasMessage = body.error && body.error.message
  if (!hasMessage) return exit(body, 1)

  return exit(body.error.message, 1)
}
