/*
 * 清空element 样式文件，全局引入定制化饿了么文件 element.css
 */
const path = require('path')
const fs = require('fs')


function searchFile (filepath) {
    let thisArr = []
    let data = getDirFile(filepath)
    data.forEach(item => {
        let itemPath = path.resolve(__dirname, `${filepath}/${item}`)
        let itemStats = stats(itemPath)
        if (!itemStats.isDirectory()) {
            thisArr.push(itemPath)
        }
    })
    return thisArr
}

function stats (filepath) {
    return fs.statSync(path.resolve(__dirname, filepath))
}
function getDirFile (filepath) {
    return fs.readdirSync(path.resolve(__dirname, filepath))
}

var arr = searchFile('../node_modules/element-ui/lib/theme-chalk')
arr.map(function (file) {
    var ws = fs.createWriteStream(file)
    ws.write('')
    ws.end()
})

module.exports = {}