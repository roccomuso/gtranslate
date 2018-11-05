var exec = require('child_process').execSync

// Helper function to execute the cli in tests and capture the output
module.exports = function (parameters) {
  try {
    console.log(`running [./bin/cli.js ${parameters}]`)
    var output = exec(`./bin/cli.js ${parameters}`, { shell: false }).toString()
    console.log('output received')
    return {
      output: output,
      code: 0
    }
  } catch (error) {
    console.log('error caught')
    return {
      output: error.stdout.toString(),
      error: error.stderr.toString(),
      code: error.status
    }
  }
}
