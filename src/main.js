const fs = require('fs')
const interactive = require('./lib/interactive.js')

module.exports = (argv) => {
  if (argv && Object.keys(argv).length === 1) {
    const short_help = fs.readFileSync('./src/data/pages/short-help.txt').toString()
    console.log(short_help)
    return
  }
  if (argv.interactive || argv.i) {
    interactive()
    return
  }
  const error_help = fs.readFileSync('./src/data/pages/error-help.txt').toString()
  console.log(error_help)
}
