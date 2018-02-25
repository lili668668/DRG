const fs = require('fs')
const constant = require('../data/constant.json')
const markdownTemplate = require('./markdownTemplate.js')

module.exports = (report) => {
  if (!fs.existsSync(constant.markdown_root)) fs.mkdirSync(constant.markdown_root)
  const year = (new Date()).getFullYear()
  const month = ((new Date()).getMonth() + 1).toFixed(0).padStart(2, '0')
  const date = ((new Date()).getDate()).toFixed(0).padStart(2, '0')
  const directory = `${constant.markdown_root}${year}${month}/`
  const path = `${directory}${year}${month}${date}.md`
  if (!fs.existsSync(directory)) fs.mkdirSync(directory)
  fs.writeFileSync(path, markdownTemplate.getMarkdown(report))
}

