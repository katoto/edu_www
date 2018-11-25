const puppeteer = require('puppeteer')
let getList = async () => {
    const browser = await (puppeteer.launch({
        ignoreHTTPSErrors: true,
        devtools: false,
        headless: false,
        args: ['--no-sandbox']
    }))
    let kutuImg = []
    for (let i = 0; i < 1; i++) {
        const page = await browser.newPage()
        await page.goto('http://www.win4000.com/meinvtag4_' + (i + 1) + '.html')
        const basekutuImg = await page.evaluate(() => {
            let kutu = []
            document.querySelectorAll('.w1180 .list_cont .tab_box li').forEach((item, index) => {
                let currObj = {}
                let baseid = null
                baseid = item.querySelector('a').getAttribute('href').replace('http://www.win4000.com/meinv', '')
                currObj._id = baseid.replace('.html', '')
                currObj.picLink = item.querySelector('a').getAttribute('href')
                currObj.pic = item.querySelector('img').getAttribute('data-original').slice(0, item.querySelector('img').getAttribute('data-original').indexOf('_')) + '.jpg'
                currObj.desc = item.querySelector('img').getAttribute('title')
                kutu.push(currObj)
            })
            return kutu
        })
        kutuImg = kutuImg.concat(basekutuImg)
    }
    for (let i = 0; i < kutuImg.length; i++) {
        const page = await browser.newPage()
        await page.goto(kutuImg[i].picLink)
        let basekutuImg = await page.evaluate(() => {
            let nextkutu = []
            let barObj = {}
            document.querySelectorAll('.scroll-img-cont .scroll-img li').forEach((item, index) => {
                let pic = item.querySelector('img').getAttribute('data-original').slice(0, item.querySelector('img').getAttribute('data-original').indexOf('_')) + '.jpg'
                nextkutu.push(pic)
            })
            document.querySelectorAll('.main-wrap .npaper_jj p').forEach((item, index) => {
                barObj.desc = item.innerHTML
            })
            return {
                nextkutu,
                nextdesc: barObj.desc
            }
        })
        kutuImg[i].nextPageMsg = basekutuImg
    }
    console.log(kutuImg)
    console.log('===============')
    browser.close()
    return {
        kutuImg
    }
}

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://47.96.234.59:27017/'
MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err
    var dbo = db.db('katoto')
    setTimeout(async () => {
        let backData = null
        backData = await getList()
        backData.kutuImg.forEach((item, index) => {
            dbo.collection('kutu').save(item)
        })
        // 4个小时抓一次
    }, 1000)
})
