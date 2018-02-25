const nodemailer = require('nodemailer')
const showdown = require('showdown')
const markdownTemplate = require('./markdownTemplate.js')
const config = require('../data/config.json')

module.exports = (address, report) => {
  const converter = new showdown.Converter()
  const transporter = nodemailer.createTransport(config.auth_config)
  const year = (new Date()).getFullYear()
  const month = ((new Date()).getMonth() + 1).toFixed(0).padStart(2, '0')
  const date = ((new Date()).getDate()).toFixed(0).padStart(2, '0')
  const subject = `Daily report from Lily, ${year}${month}${date}`
  const html = converter.makeHtml(markdownTemplate.getMarkdown(report))
  let mail_config = Object.assign({}, config.mail_config, { to: address, subject, html })
  transporter.sendMail(mail_config)
}
