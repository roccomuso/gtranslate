var chai = require('chai')
var runWithParameters = require('./test-runner')
const boxed = require('./boxed-tester')

chai.should()

describe('boxed output', () => {
  it('should return boxed output if no brief option is given', (done) => {
    runWithParameters(['-s', '-en', '-t', 'no', 'sandwich'], (result) => {
      var output = boxed(result.output)
      output.translation.should.equal('smørbrød')
      output.sourceLanguage.should.equal('en')
      output.targetLanguage.should.equal('no')
      done()
    })
  })
})
