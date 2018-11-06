var chai = require('chai')
var runWithParameters = require('./test-runner')
const boxed = require('./boxed-tester')

chai.should()

describe('brief option', () => {
  it('should return boxed output if no brief option is given', (done) => {
    runWithParameters(['-s', 'en', '-t', 'sv', 'sandwich'], (result) => {
      boxed(result.output).translation.should.equal('smörgås')
      done()
    })
  })

  it('should only return translation if brief input is supplied', (done) => {
    runWithParameters(['-s', 'en', '-t', 'sv', '-b', 'sandwich'], (result) => {
      result.output.should.equal('smörgås')
      done()
    })
  })
})
