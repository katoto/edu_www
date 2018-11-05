const path = require('path')
const fs = require('fs')

function searchFile(filepath) {
    let thisArr = []
    let data = getDirFile(filepath)
    data.forEach(item => {
        let itemPath = path.resolve(__dirname, `${filepath}/${item}`)
        thisArr.push(itemPath)
    })
    return thisArr
}

function stats(filepath) {
    return fs.statSync(path.resolve(__dirname, filepath))
}

function getDirFile(filepath) {
    return fs.readdirSync(path.resolve(__dirname, filepath))
}

function deal(arr) {
    let reg = /[^.]+\.([^.]+\.)/
    arr.forEach(filepath => {
        let fileHash = filepath.match(reg)
        if (fileHash) {
            let re = fs.createReadStream(filepath)
            let wr = fs.createWriteStream(filepath.replace(fileHash[1], ''))
            re.pipe(wr)
        }
    })
}

console.log('执行seo打包后的静态资源文件名称优化')
deal(searchFile('./dist/static/css'))
deal(searchFile('./dist/static/fonts'))
deal(searchFile('./dist/static/img'))
deal(searchFile('./dist/static/js'))