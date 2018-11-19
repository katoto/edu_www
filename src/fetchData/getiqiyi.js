const puppeteer = require('puppeteer')
let getList = async () => {
    const browser = await (puppeteer.launch({
        ignoreHTTPSErrors: true,
        devtools: false,
        headless: true,
        args: ['--no-sandbox']
    }))
    const page = await browser.newPage()
    await page.goto('https://list.iqiyi.com/www/2/-------------24-1-1-iqiyi--.html')
    const movieList = await page.evaluate(() => {
        let movieList = []
        document.querySelectorAll('.site-piclist .J_videoLi').forEach((item, index) => {
            let currObj = {}
            currObj._id = item.getAttribute('tvid')
            currObj.picLink = item.querySelector('.site-piclist_pic_link').getAttribute('href')
            currObj.pic = item.querySelector('img').getAttribute('src')
            currObj.name = item.querySelector('img').getAttribute('title')
            currObj.desc = item.querySelector('.site-piclist_info_describe').innerHTML
            currObj.score = item.querySelector('.score .num').innerHTML
            movieList.push(currObj)
        })
        return movieList
    })
    const pagemusic = await browser.newPage()
    await pagemusic.goto('https://list.iqiyi.com/www/5/----------------iqiyi--.html')
    const musicList = await pagemusic.evaluate(() => {
        let musicList = []
        document.querySelectorAll('.site-piclist .site-piclist_pic a').forEach((item, index) => {
            let currObj = {}
            currObj._id = item.getAttribute('data-qidanadd-tvid')
            currObj.picLink = item.getAttribute('href')
            currObj.pic = item.querySelector('img').getAttribute('src')
            currObj.name = item.querySelector('img').getAttribute('title')
            currObj.timeLen = item.querySelector('.viedo_rb .icon-vInfo').innerHTML
            musicList.push(currObj)
        })
        return musicList
    })
    browser.close()
    return {
        movieList,
        musicList
    }
}
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://47.96.234.59:27017/'
MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err
    var dbo = db.db('katoto')
    setInterval(async () => {
        let backData = null
        backData = await getList()
        backData.movieList.forEach((item, index) => {
            dbo.collection('movie').save(item)
        })
        backData.musicList.forEach((item, index) => {
            dbo.collection('music').save(item)
        })
        // 4个小时抓一次
    }, 14400000)
})

// dbo.collection('demo').insertMany(backData.movieList)

// movieList = movieList.slice(0, 10)
// db.test.update({ '_id': '1' }, { '$set': { 'html': '3', 'qeew': '1' } })
// 如果集合内部已经存在一个和obj相同的"_id"的记录，Mongodb会把obj对象替换集合内已存在的记录，如果不存在，则会插入obj对象。
// db.test.save({''})
