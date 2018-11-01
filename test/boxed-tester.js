var chai = require('chai')
chai.should()

function trimBorders (boxedLine) {
  return boxedLine.replace(/│/g, '').trim()
}

function assertIsBoxed (lines) {
  var numberOfLines = lines.length
  numberOfLines.should.above(9)

  var secondLine = lines[1]
  secondLine.should.contain('┌').and.contain('────').and.contain('┐')

  var secondToLastLine = lines[lines.length - 3]
  secondToLastLine.should.contain('└─').and.contain('─┘')
}

// Helper to "unwrap" boxed content
module.exports = function (boxedContent) {
  var lines = boxedContent.split('\n')
  assertIsBoxed(lines)

  var languages = trimBorders(lines[3]).split(' → ')
  var source = languages[0]
  var target = languages[1]

  return {
    translation: trimBorders(lines[5]),
    sourceLanguage: source || 'undefined',
    targetLanguage: target || 'undefined'
  }
}
