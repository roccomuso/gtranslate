var chai = require('chai')
chai.should()

function trimBorders (boxedLine) {
  return boxedLine.replace(/│/g, '').trim()
}

function assertIsBoxed (content) {
  var lines = content.split('\n')
  var numberOfLines = lines.length
  numberOfLines.should.above(8, `expected output not boxed [${lines}]`)

  var secondLine = lines[1]
  secondLine.should.contain('┌').and.contain('────').and.contain('┐')

  var secondToLastLine = lines[lines.length - 3]
  secondToLastLine.should.contain('└─').and.contain('─┘')
}

// Helper to "unwrap" boxed content
module.exports = function (boxedContent) {
  assertIsBoxed(boxedContent)
  var lines = boxedContent.split('\n')

  var languages = trimBorders(lines[3]).split(' → ')
  var source = languages[0]
  var target = languages[1]

  return {
    translation: trimBorders(lines[5]),
    sourceLanguage: source || 'undefined',
    targetLanguage: target || 'undefined'
  }
}
