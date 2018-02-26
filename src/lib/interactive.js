const inquirer = require('inquirer')
const ask = require('./ask')
const configOperate = require('../lib/configOperate.js')
const saveMarkdown = require('../lib/saveMarkdown.js')
const sendMail = require('../lib/sendMail.js')
const drq = require('../data/questions/daily-report-questions.json')
const cq = require('../data/questions/config-questions.json')
const sq = require('../data/questions/save-questions.json')
const smq = require('../data/questions/send-mail-question.json')
const config = require('../data/config.json')
const constant = require('../data/constant.json')

let report = {}
let useOldConfig = false
const bot = inquirer.createPromptModule()

const middleware = (key) => {
  return new Promise((resolve) => {
    let array = []
    const callback = (answer) => {
      if (answer[key] !== '' && answer[key] !== 'rm') array = array.concat(answer[key])
    }
    const promise = useOldConfig ? ask.aSetQuestion(false, drq[key], callback, report[key]) : ask.aSetQuestion(false, drq[key], callback)
    return promise.then(() => resolve(array))
  })
}

module.exports = () => {
  return ask.useOldConfig()
    .then((res) => {
      useOldConfig = res
      if (useOldConfig) report = configOperate.getConfig()
      return middleware('done')
    })
    .then((res) => {
      report.done = res
      return middleware('ongoing')
    })
    .then((res) => {
      report.ongoing = res
      return middleware('todo_tomorrow')
    })
    .then((res) => {
      report.todo_tomorrow = res
      return middleware('todo_this_week')
    })
    .then((res) => {
      report.todo_this_week = res
      return middleware('todo_next_week')
    })
    .then((res) => {
      report.todo_next_week = res
      return middleware('todo_month')
    })
    .then((res) => {
      report.todo_month = res
      return bot(cq.is_config)
    })
    .then((res) => {
      if (res.is_config) configOperate.setConfig(report)
      return bot(sq.save_markdown)
    })
    .then((res) => {
      if (res.save_markdown) {
        const year = (new Date()).getFullYear()
        const month = ((new Date()).getMonth() + 1).toFixed(0).padStart(2, '0')
        const date = ((new Date()).getDate()).toFixed(0).padStart(2, '0')
        const directory = `${constant.markdown_root}${year}${month}/`
        const question = Object.assign({}, sq.save_path, { default: `${directory}${year}${month}${date}.md` })
        return bot(question)
          .then((path) => {
            saveMarkdown(path.save_path, report)
            Promise.resolve()
          })
      }
      return Promise.resolve()
    })
    .then(() => {
      return bot(smq.send_mail)
    })
    .then((res) => {
      if (res.send_mail) {
        const question = Object.assign({}, smq.to_adddress, { default: config.mail_config.to })
        return bot(question)
          .then((address) => {
            sendMail(address.to_adddress, report)
          })
      }
    })
}
