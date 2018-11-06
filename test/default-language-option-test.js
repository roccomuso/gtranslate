var chai = require('chai')
var runWithParameters = require('./test-runner')

chai.should()

describe('default language option', () => {
  it('can set default language', (done) => {
    console.log('executing')
    runWithParameters(['--set-target', 'en'], (result) => {
      console.log('response recieved')
      result.output.should.contain('Target lang set!')
      console.log('calling done')
      done()
      console.log('default language option test is done.')
    })
  })
})
