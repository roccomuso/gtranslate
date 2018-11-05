var exec = require('child_process').execSync

// Helper function to execute the cli in tests and capture the output
module.exports = function (parameters) {
  try {
    var output = exec(`./bin/cli.js ${parameters}`).toString()
    console.log("got output: \n" + output)
    return {
      output: output,
      code: 0
    }
  } catch (error) {
    return {
      output: (error.stdout || '').toString(),
      error: (error.stderr || '').toString(),
      code: error.status
    }
  }
}
