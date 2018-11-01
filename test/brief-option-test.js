var chai = require('chai')
var runWithParameters = require('./test-runner')
const boxed = require('./boxed-tester')

chai.should()

describe('brief option', function () {
  it('should return boxed output if no brief option is given', function () {
    var result = runWithParameters('-s en -t sv sandwich')
    boxed(result.output).translation.should.equal('smörgås')
  })

  it('should only return translation if brief input is supploed', function () {
    var result = runWithParameters('-s en -t sv -b sandwich')
    result.output.trim().should.equal('smörgås')
  })
})
