var chai = require('chai')
var runWithParameters = require('./test-runner')

chai.should()

describe('default language option', () => {
  it('can set default language', (done) => {
    runWithParameters('--set-target en', (result) => {
      result.output.should.contain('Target lang set!')
      done()
    })
  })
})
