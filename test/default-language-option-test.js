var chai = require('chai')
var runWithParameters = require('./test-runner')

chai.should()

describe('default language option', function () {
  it('can set default language', function () {
    var result = runWithParameters('--set-target en')
    result.output.should.contain('Target lang set!')
  })
})
