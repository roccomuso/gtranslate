var chai = require('chai')
var runWithParameters = require('./test-runner')

chai.should()

describe('default language option', function () {
  it('can set default language', function () {
    var result = runWithParameters('--set-target en')
    console.log(`got output from run: ${JSON.stringify(result)}`)
    result.output.should.contain('Target lang set!')
  })
})
