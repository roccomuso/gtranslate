var chai = require('chai')
var runWithParameters = require('./test-runner')
const boxed = require('./boxed-tester')

chai.should()

describe('boxed output', function () {
  it('should return boxed output if no brief option is given', function () {
    var result = runWithParameters('-s en -t no sandwich')
    boxed(result.output).translation.should.equal('smørbrød')
    boxed(result.output).sourceLanguage.should.equal('en')

    // TODO: this should not be undefined
    boxed(result.output).targetLanguage.should.equal('undefined')
  })
})
