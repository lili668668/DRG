const inquirer = require('inquirer')
const drq = require('../../data/questions/daily-report-questions.json')

const bot = inquirer.createPromptModule()

const ask = (isFinish, originQuestion, callback, defaultAnswer) => {
  return new Promise((resolve) => {
    let question = originQuestion
    if (isFinish) return resolve()
    if (defaultAnswer && defaultAnswer.length !== 0) {
      question = Object.assign({}, originQuestion, { default: defaultAnswer[0] })
      defaultAnswer = defaultAnswer.slice(1)
    }
    return bot(question)
      .then((answer) => {
        callback(answer)
        return bot(drq.is_finish)
      })
      .then(finish => ask(finish.isFinish, originQuestion, callback, defaultAnswer))
      .then(() => resolve())
  })
}

module.exports = ask
