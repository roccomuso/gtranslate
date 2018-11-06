var chai = require('chai')
var runWithParameters = require('./test-runner')

chai.should()

describe('cli base functionality', () => {
  it('should fail with error if no target language is specified', (done) => {
    runWithParameters([], (result) => {
      result.code.should.equal(1)
      result.output.should.contain('No target language specified.')
      done()
    })
  })

  it('should return boxed output given simple parameters', (done) => {
    runWithParameters(['-s', 'en', '-t', 'ja', 'test'], (result) => {
      result.code.should.equal(0)
      result.output.should.contain('en →').and.contain('テスト')
      done()
    })
  })
})
