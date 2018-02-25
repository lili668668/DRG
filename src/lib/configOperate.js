const fs = require('fs')
const constant = require('../data/constant.json')

const save_path = constant.root_path + constant.save_path + constant.save_file
const save_directory = constant.root_path + constant.save_path

const getConfig = () => {
  return JSON.parse(fs.readFileSync(save_path))
}

const setConfig = (report) => {
  if (!fs.existsSync(save_directory)) fs.mkdirSync(save_directory)
  fs.writeFileSync(save_path, JSON.stringify(report))
}

module.exports.getConfig = getConfig
module.exports.setConfig = setConfig
