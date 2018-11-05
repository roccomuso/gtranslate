var chai = require('chai')
var runWithParameters = require('./test-runner')

chai.should()

describe('default language option', () => {
  it('can set default language', (done) => {
    var result = runWithParameters('--set-target en')
    result.output.should.contain('Target lang set!')
    done()
  })
})
