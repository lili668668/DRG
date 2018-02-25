const year = (new Date()).getFullYear()
const month = ((new Date()).getMonth() + 1).toFixed(0).padStart(2, '0')
const date = ((new Date()).getDate()).toFixed(0).padStart(2, '0')
const renderList = (array) => {
  let listArray = []
  array.forEach((item) => {
    const listTemplate = `- ${item}`
    listArray = listArray.concat(listTemplate)
  })
  return listArray.join('\n')
}

module.exports.getMarkdown = (report) => {
  const template = 
`# ${year}/${month}/${date} Daily Report
## Done
${renderList(report.done)}
## Ongoing
${renderList(report.ongoing)}
## Todo
### Tomorrow
${renderList(report.todo_tomorrow)}
### This week
${renderList(report.todo_this_week)}
### Next week
${renderList(report.todo_next_week)}
### This month
${renderList(report.todo_month)}`
  return template
}



