/*
 *  动态生成路由
 */
const path = require('path')
const fs = require('fs')

let options = {
    encoding:'utf8'
}

let readable = fs.createReadStream('../src/router/index.js',options)

readable.on('error',(err)=>{
    console.log('发送异常',err)
})
readable.on('open',(err)=>{
    console.log('发送异常',err)
})
readable.on('ready',(err)=>{
    console.log('发送异常',err)
})
readable.on('data',(chunk)=>{
    console.log('发')
    console.log(chunk)
})
readable.on('end',(err)=>{
    console.log('读取已完成。。。')
})
readable.on('close',(err)=>{
    console.log('文件关闭')
})

// function searchFile (filepath) {
//     let thisArr = []
//     let data = getDirFile(filepath)
//     data.forEach(item => {
//         let itemPath = path.resolve(__dirname, `${filepath}/${item}`)
//         let itemStats = stats(itemPath)
//         if (!itemStats.isDirectory()) {
//             thisArr.push(itemPath)
//         }
//     })
//     return thisArr
// }
//
// function stats (filepath) {
//     return fs.statSync(path.resolve(__dirname, filepath))
// }
// function getDirFile (filepath) {
//     return fs.readdirSync(path.resolve(__dirname, filepath))
// }
//
// var arr = searchFile('../node_modules/element-ui/lib/theme-chalk')
// arr.map(function (file) {
//     var ws = fs.createWriteStream(file)
//     ws.write('')
//     ws.end()
// })

module.exports = {
    nowRouter:[]
}
