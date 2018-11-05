var chai = require('chai')
var runWithParameters = require('./test-runner')
const boxed = require('./boxed-tester')

chai.should()

describe('brief option', () => {
  it('should return boxed output if no brief option is given', () => {
    var result = runWithParameters('-s en -t sv sandwich')
    boxed(result.output).translation.should.equal('smörgås')
  })

  it('should only return translation if brief input is supplied', () => {
    var result = runWithParameters('-s en -t sv -b sandwich')
    result.output.should.equal('smörgås')
  })
})
