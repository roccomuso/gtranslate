var chai = require('chai')
var runWithParameters = require('./test-runner')

chai.should()

describe('cli base functionality', function () {
  it('should fail with error if no target language is specified', function () {
    var result = runWithParameters('')
    result.code.should.equal(1)
    result.output.should.contain('No target language specified.')
  })

  it('should return boxed output given simple parameters', function () {
    var result = runWithParameters('-s en -t ja test')
    result.code.should.equal(0)
    result.output.should.contain('en →').and.contain('テスト')
  })
})
