# gtranslate

[![NPM Version](https://img.shields.io/npm/v/gtranslate.svg)](https://www.npmjs.com/package/gtranslate)
![node](https://img.shields.io/node/v/gtranslate.svg)
[![Dependency Status](https://david-dm.org/roccomuso/gtranslate.png)](https://david-dm.org/roccomuso/gtranslate)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
<span class="badge-patreon"><a href="https://patreon.com/roccomuso" title="Donate to this project using Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Patreon donate button" /></a></span>

> Node.js Google translate CLI tool!

## Install

    $ npm install -g gtranslate

[![NPM](https://nodei.co/npm/gtranslate.png?downloads=true&downloadRank=true)](https://nodei.co/npm/gtranslate/)

## Usage

1. Register and setup a new **API key** from the [Google Cloud](https://support.google.com/cloud/answer/6158862?hl=en).

2. type `gtranslate register <API_KEY>` with your APIKEY:

**Heads Up**! The API_KEY is stored in your home directory in a file called `.gtranslate`

3. That's it!

### Common usage

Register a new `API_KEY`:

    $ gtranslate -r <API_KEY>

Translate with language autodetect and default target language:

    $ gtranslate <text>

Basic translation (with source language autodetect):

    $ gtranslate -t en <text>

Provide the `--source (-s)` language:

    $ gtranslate -s it -t en <text>

Set a default target language:

    $ gtranslate --set-target it

(By default EN is the default target language)

## Available options

```text
--register OR -r     Set a new Google Translate API KEY
--source OR -s     Provide the source language
--target OR -t     Provide the target language
--set-target OR -st     Set a default target language [EN by default]
```

## Author

Rocco Musolino ([@roccomuso](https://twitter.com/roccomuso))
