var spawn = require('child_process').spawn

// Helper function to execute the cli in tests and capture the output
module.exports = function (args, onComplete) {
  let result = {
    code: 0,
    output: '',
    error: ''
  }

  let process = spawn('./bin/cli.js', args)

  process.stdout.on('data', (data) => { result.output += data })
  process.stderr.on('data', (data) => { result.error += data })

  process.on('close', (code) => {
    result.code = code
    onComplete(result)
  })
}
