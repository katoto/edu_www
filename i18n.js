const config = require('./i18n-config');
const {fileSuffix, root, language, usedFile, unusedFile, noTranslateFile, distDir, ignoreFile} = config
const path = require('path')
const fs = require('fs')

const lanaguagePack = require(`./src/language/${language}`)

let used = {}
let unused = {}
let noTranslate = {}

// 遍历找出需要国际化检查的文件
function searchFile (filepath) {
    let thisArr = []
    let data = getDirFile(filepath)
    data.forEach(item => {
        let itemPath = path.resolve(__dirname, `${filepath}/${item}`)
        let itemStats = stats(itemPath)
        if (itemStats.isDirectory()) {
            let resultArr = searchFile(itemPath)
            thisArr = thisArr.concat(resultArr)
        } else if (isRightFile(itemPath)){
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

function isRightFile (filepath) {
    for (let ignoreIndex = 0; ignoreIndex < ignoreFile.length; ignoreIndex++) {
        if (filepath === path.resolve(__dirname, ignoreFile[ignoreIndex])) {
            return false
        }
    }
    for (let index = 0; index < fileSuffix.length; index++) {
        if (new RegExp(`\.${fileSuffix[index]}$`).test(filepath)) {
            return true
        }
    }
    return false
}

function deleteFolder(path) {
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach((file) => {
            var curPath = `${path}/${file}`;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolder(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}


function createDist () {
    deleteFolder(`./${distDir}`)
    fs.mkdirSync(`./${distDir}`)
    let usedFileWS = fs.createWriteStream(`./${distDir}/${usedFile}`)
    let unusedFileWS = fs.createWriteStream(`./${distDir}/${unusedFile}`)
    let noTranslateFileFileWS = fs.createWriteStream(`./${distDir}/${noTranslateFile}`)
    usedFileWS.write(JSON.stringify(used))
    usedFileWS.end()
    unusedFileWS.write(JSON.stringify(unused))
    unusedFileWS.end()
    noTranslateFileFileWS.write(JSON.stringify(noTranslate))
    noTranslateFileFileWS.end()
    console.log('翻译扫描成功!')
}

function matchLangTag (str) {
    let reg = /<lang>(.*?)<\/lang>/gi
    let arr = []
    result = reg.exec(str)
    while (result !== null) {
        arr.push(result[1])
        result = reg.exec(str)
    }
    return arr
}

function matchVLang (str) {
    let reg = /v-lang="'(.*?)'"/gi
    let arr = []
    result = reg.exec(str)
    while (result !== null) {
        arr.push(result[1])
        result = reg.exec(str)
    }
    return arr
}

function matchVLang1 (str) {
    let reg = /v-lang='"(.*?)'"/gi
    let arr = []
    result = reg.exec(str)
    while (result !== null) {
        arr.push(result[1])
        result = reg.exec(str)
    }
    return arr
}

function findFirstParams (str) {
    let reg = /'(.*?)'/
    let reg1 = /"(.*?)"/
    let result = reg.exec(str)
    let result1 = reg1.exec(str)
    if (result !== null && result1 !== null) {
        return str.indexOf(result[1]) > str.indexOf(result1[1]) ? result1[1] : result[1]
    } else if (result) {
        return result[1]
    } else if (result1) {
        return result1[1]
    } else {
        throw new Error(`错误的翻译写法:${str}`)
    }
}

function matchLangFunction (str) {
    let reg = /_\('([^']*?)'/gi
    let reg1 = /_\("([^"]*?)"/gi
    let arr = []
    let result = reg.exec(str)
    let result1 = reg1.exec(str)
    while (result !== null) {
        let tmp = result[1]
        arr.push(tmp)
        result = reg.exec(str)
    }
    while (result1 !== null) {
        let tmp = result1[1]
        arr.push(tmp)
        result1 = reg1.exec(str)
    }
    return arr
}

async function readFile (filepath) {
    return new Promise(resolve => {
        fs.readFile(path.resolve(filepath), (err, fileData) => {
            resolve(fileData)
        })
    })
}

async function getFileLang () {
    let arr = []
    let files = searchFile(root)
    for (let index = 0; index < files.length; index++) {
        let file = files[index]
        let fileData = await readFile(file)
        let arr1 = matchLangTag(fileData)
        let arr2 = matchVLang(fileData)
        let arr3 = matchVLang1(fileData)
        let arr4 = matchLangFunction(fileData)
        arr = arr.concat(arr1, arr2, arr3, arr4)
    }
    return arr
}

function analyse (data) {
    let tmpData = { ...lanaguagePack }
    data.forEach(word => {
        if (lanaguagePack[word]) {
            used[word] = lanaguagePack[word]
            delete tmpData[word]
        } else {
            noTranslate[word] = word
        }
    })
    unused = { ...tmpData }
    createDist()
}

async function run () {
    let data = await getFileLang()
    analyse(data)
}
run()


