const fs = require('fs')
const inquirer = require('inquirer')
const cq = require('../../data/questions/config-questions.json')
const constant = require('../../data/constant.json')

module.exports = () => {
  return new Promise((resolve) => {
    const bot = inquirer.createPromptModule()

    const save_path = constant.root_path + constant.save_path + constant.save_file

    if (fs.existsSync(save_path)) {
      return bot(cq.use_old_config)
        .then((answer) => {
          resolve(answer.use_old_config)
        })
    }
    return resolve(false)
  })
}
