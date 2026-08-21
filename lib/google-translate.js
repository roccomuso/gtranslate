'use strict'

// Minimal client for the Google Translate API v2, using the platform's
// built-in fetch instead of the unmaintained `google-translate` npm package
// (which pulled in `request` and a long chain of vulnerable transitive deps).

const API_BASE = 'https://translation.googleapis.com/language/translate/v2/'
const MAX_GET_QUERY_LEN = 4500
const MAX_SEGMENTS = 100

const NAMED_ENTITIES = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  '#39': "'",
  nbsp: ' '
}

function decodeEntities (str) {
  return String(str).replace(/&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z]+\d*);/g, (match, entity) => {
    if (entity[0] === '#') {
      const code = entity[1] === 'x' || entity[1] === 'X'
        ? parseInt(entity.slice(2), 16)
        : parseInt(entity.slice(1), 10)
      return Number.isNaN(code) ? match : String.fromCodePoint(code)
    }
    return Object.prototype.hasOwnProperty.call(NAMED_ENTITIES, entity) ? NAMED_ENTITIES[entity] : match
  })
}

function shouldSplitSegments (strings) {
  if (!Array.isArray(strings)) return false
  if (strings.length > MAX_SEGMENTS) return true
  return encodeURIComponent(strings.join(',')).length > MAX_GET_QUERY_LEN && strings.length !== 1
}

function splitArraysForGoogle (arr, result) {
  if (arr.length > MAX_SEGMENTS || (encodeURIComponent(arr.join(',')).length > MAX_GET_QUERY_LEN && arr.length !== 1)) {
    const mid = Math.floor(arr.length / 2)
    splitArraysForGoogle(arr.slice(0, mid), result)
    splitArraysForGoogle(arr.slice(mid), result)
  } else {
    result.push(arr)
  }
}

function toStringSets (strings) {
  if (shouldSplitSegments(strings)) {
    const result = []
    splitArraysForGoogle(strings, result)
    return result
  }
  return [Array.isArray(strings) ? strings : [strings]]
}

async function request (apiKey, method, path, params) {
  let res
  if (method === 'GET') {
    const url = new URL(API_BASE + path)
    url.searchParams.set('key', apiKey)
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) url.searchParams.set(key, value)
    }
    res = await fetch(url, { method: 'GET' })
  } else {
    const body = new URLSearchParams()
    body.set('key', apiKey)
    for (const [key, value] of Object.entries(params)) {
      if (Array.isArray(value)) {
        value.forEach((v) => body.append(key, v))
      } else if (value !== undefined) {
        body.set(key, value)
      }
    }
    res = await fetch(API_BASE + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-HTTP-Method-Override': 'GET'
      },
      body: body.toString()
    })
  }

  const text = await res.text()
  let parsed
  try {
    parsed = JSON.parse(text)
  } catch (e) {
    throw new Error('Could not parse response from Google: ' + (text || 'null'))
  }

  if (!res.ok) {
    const message = parsed && parsed.error && parsed.error.message
    const err = new Error(message || `Request failed with status ${res.status}`)
    err.response = { statusCode: res.status, body: text }
    throw err
  }

  return parsed
}

module.exports = function (apiKey) {
  function translate (strings, sourceLang, targetLang, done) {
    if (!done) {
      done = targetLang
      targetLang = sourceLang
      sourceLang = null
    }

    if (typeof done !== 'function') return console.log('No callback defined')
    if (typeof strings !== 'string' && !Array.isArray(strings)) return done('Input source must be a string or array of strings')
    if (typeof targetLang !== 'string') return done('No target language specified. Must be a string')

    const data = { target: targetLang }
    if (sourceLang) data.source = sourceLang

    const stringSets = toStringSets(strings)

    Promise.all(stringSets.map((stringSet) =>
      request(apiKey, 'POST', '', Object.assign({ q: stringSet }, data)).then((res) => {
        const translations = res.data.translations || res.data
        stringSet.forEach((s, i) => {
          if (translations[i]) translations[i].originalText = s
        })
        return translations.map((t) => Object.assign({}, t, { translatedText: decodeEntities(t.translatedText) }))
      })
    )).then((results) => {
      let translations = [].concat(...results)
      if (translations.length === 1) translations = translations[0]
      done(null, translations)
    }, (err) => done(err))
  }

  function getSupportedLanguages (target, done) {
    if (typeof target === 'function') {
      done = target
      target = undefined
    }
    if (typeof done !== 'function') return console.log('No callback defined')

    request(apiKey, 'GET', 'languages', { target })
      .then((res) => {
        let languages = res.data.languages
        if (languages[0] && !languages[0].name) languages = languages.map((l) => l.language)
        done(null, languages)
      }, (err) => done(err))
  }

  function detectLanguage (strings, done) {
    if (typeof done !== 'function') return console.log('No callback defined')
    if (typeof strings !== 'string' && !Array.isArray(strings)) return done('Input source must be a string or array of strings')

    const stringSets = toStringSets(strings)

    Promise.all(stringSets.map((stringSet) =>
      request(apiKey, 'POST', 'detect', { q: stringSet }).then((res) => {
        let detections = res.data && res.data.detections ? res.data.detections : res
        detections = detections.length > 1 ? detections.map((d) => d[0]) : [detections[0]]
        stringSet.forEach((s, i) => {
          if (detections[i]) detections[i].originalText = s
        })
        return detections
      })
    )).then((results) => {
      let detections = [].concat(...results)
      if (detections.length === 1) detections = detections[0]
      done(null, detections)
    }, (err) => done(err))
  }

  return { translate, getSupportedLanguages, detectLanguage }
}
