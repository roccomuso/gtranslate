const chai = require('chai')
const runWithParameters = require('./test-runner')
const boxed = require('./boxed-tester')

chai.should()

describe('boxed output', function () {
  it('should return boxed output if no brief option is given', function () {
    const result = runWithParameters('-s en -t no sandwich')
    const output = boxed(result.output)
    output.translation.should.equal('smørbrød')
    output.sourceLanguage.should.equal('en')
    output.targetLanguage.should.equal('no')
  })
})
