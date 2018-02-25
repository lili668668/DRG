const fs = require('fs')
const constant = require('../data/constant.json')
const markdownTemplate = require('./markdownTemplate.js')

module.exports = (path, report) => {
  if (!fs.existsSync(constant.markdown_root)) fs.mkdirSync(constant.markdown_root)
  const directory = `${path.substr(0, path.lastIndexOf('/'))}/`
  if (!fs.existsSync(directory)) fs.mkdirSync(directory)
  fs.writeFileSync(path, markdownTemplate.getMarkdown(report))
}

