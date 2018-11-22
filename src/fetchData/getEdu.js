const puppeteer = require('puppeteer')
let getList = async () => {
    const browser = await (puppeteer.launch({
        ignoreHTTPSErrors: true,
        devtools: false,
        headless: false,
        args: ['--no-sandbox']
    }))
    let getUrlObj = {

        // < ul class="nav navbar-nav sub-nav hidden-xs" >
        // <li class="active"><a href="/class/2250">幼儿读物</a></li> <li><a href="/class/2251">儿童英语</a></li> <li><a href="/class/2252">拼音汉字</a></li> <li><a href="/class/2253">启蒙教育</a></li> <li><a href="/class/2254">儿童歌曲</a></li> <li><a href="/class/2255">其他</a></li>	</ul >

        preschool: ['/class/2250', '/class/2251', '/class/2252', '/class/2253', '/class/2254', '/class/2255'], // 学前教育
        primaryschool: [], // 小学教育
        middleschool: [], // 初中教育
        highschool: [], // 高中教育
        university: [], // 高等教育
        edupapers: [], // 论文
        masterschool: [], // 研究生考试
        industrydocuments: [], // 行业资料
        management: [], // 管理
        foreignlanguage: [], // 外语学习
        informationtechnology: [], // IT计算机
        qualificationexamination: [], // 资格/认证考试
        otherdocs: [] // 其他
    }

    const page = await browser.newPage()
    await page.goto('https://www.iqiyi.com/dianying_new/i_list_paihangbang.html')
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
    setTimeout(async () => {
        let backData = null
        backData = await getList()
        backData.movieList.forEach((item, index) => {
            dbo.collection('movie').save(item)
        })
        backData.musicList.forEach((item, index) => {
            dbo.collection('music').save(item)
        })
        // 4个小时抓一次
    }, 1000)
})
