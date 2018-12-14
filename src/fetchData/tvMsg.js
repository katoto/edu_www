const puppeteer = require('puppeteer')
let getList = async () => {
    const browser = await (puppeteer.launch({
        ignoreHTTPSErrors: true,
        devtools: false,
        headless: false,
        args: ['--no-sandbox']
    }))
    // 循环10页抓取电视剧 相当于有三百个数据
    let allTvList = [] // 所有的tv列表
    for (let i = 0; i < 10; i++) {
        const page = await browser.newPage()
        await page.goto('https://list.iqiyi.com/www/2/-------------24-' + (i + 1) + '-1-iqiyi--.html')
        const list = await page.evaluate(() => {
            let list = []
            document.querySelectorAll('.site-piclist li .site-piclist_pic_link').forEach((item, index) => {
                let currObj = {}
                currObj._id = item.getAttribute('data-qidanadd-albumid')
                currObj.picLink = item.getAttribute('href')
                currObj.pic = item.querySelector('img').getAttribute('src')
                currObj.name = item.querySelector('img').getAttribute('title')
                currObj.tvLenDesc = item.querySelector('.icon-vInfo').innerHTML
                list.push(currObj)
            })
            return list
        })
        allTvList = allTvList.concat(list)
    }
    console.log(allTvList)
    // return movieList
    browser.close()
    return {
        allTvList
    }
}
// setTimeout(async () => {
//     let backData = null
//     backData = await getList()
//     console.log(new Date())
//     // backData.movieList.forEach((item, index) => {
//     //     dbo.collection('movie').save(item)
//     // })
//     // backData.musicList.forEach((item, index) => {
//     //     dbo.collection('music').save(item)
//     // })
// }, 1000)

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://47.96.234.59:27017/'
MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err
    var dbo = db.db('katoto')
    setTimeout(async () => {
        let backData = null
        backData = await getList()
        console.log(new Date())
        backData.allTvList.forEach((item, index) => {
            dbo.collection('tvlist').save(item)
        })
    }, 1000)
})
