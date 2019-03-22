/**
 *  相关的工具函数
 */
import { Message, Notification } from 'element-ui'

export const src = 'pc'
export const tipsTime = 2000
export const channel = 2000 // 暂时就sign 注册用到

export function mapActions (acts, ns) {
    const aTypes = {}
    const actions = {}
    Object.keys(acts).forEach((key) => {
        aTypes[key] = [ns, key].join('/')
        actions[aTypes[key]] = acts[key]
    })
    return {
        actions,
        aTypes
    }
}
export const platform = 'pc'
export function isForbitPage () {
    // 无需要刷接口 (禁止请求页面接口、websocket)
    let forbitName = ['/supercoin']
    let isForbit = false
    for (let i = 0, len = forbitName.length; i < len; i++) {
        if (window.location.href.indexOf(forbitName[i]) > -1) {
            isForbit = true
            break
        }
    }
    return isForbit
}

export function mapMutations (muts, ns) {
    const mTypes = {}
    const mutations = {}
    Object.keys(muts).forEach((key) => {
        mTypes[key] = [ns, key].join('/')
        mutations[mTypes[key]] = muts[key]
    })
    return {
        mutations,
        mTypes
    }
}

export function wait (time) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), time)
    })
}

export const isWeiX = (function () {
    let ua = navigator.userAgent.toLowerCase()
    return ~ua.indexOf('micromessenger')
})()

export const isIOS = (function () {
    let ua = navigator.userAgent
    let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    return isiOS
})()

const CK = 'block_ck'
export const isMobile = /applewebkit.*mobile.*/.test(window.navigator.userAgent.toLowerCase())

export function getCK () {
    return localStorage.getItem(CK)
}

export function setCK (ck) {
    return localStorage.setItem(CK, ck)
}

export function removeCK () {
    return localStorage.setItem(CK, '')
}

export function isLog () {
    return !((getCK() === '0' || !getCK() || getCK() === 'null' || getCK() === ''))
}

export function formateEmail (email, isFull) {
    var regEmail = /(\w+(?:[-+.]\w+)*)(@\w+([-.]\w+)*\.\w+([-.]\w+)*)/
    var regArr = null
    email = email.toString()
    if (regEmail.test(email)) {
        regArr = regEmail.exec(email)
        if (regArr[1] && regArr[1].length > 10) {
            email = regArr[1].slice(0, 4) + '**' + regArr[1].slice(-4) + regArr[2]
        }
        if (!isFull) {
            if (regArr[1] && regArr[1].length > 10) {
                email = regArr[1].slice(0, 4) + '**' + regArr[1].slice(-4) + regArr[2]
            }
            if (email.indexOf('@') > -1) {
                email = email.split('@')[0]
            }
        } else {
            /* tiger 要求显示更短 */
            if (regArr[1]) {
                if (regArr[1].length >= 2) {
                    email = regArr[1].slice(0, 2) + '**' + regArr[2]
                } else {
                    email = regArr[1] + '**' + regArr[2]
                }
            }
        }
        return email
    } else {
        console.error('email error at formate_email')
        return false
    }
}

/*
 *  11个数中 随机 选出 len 个
 *  @params  len
 *  shuffle()  洗牌算法
 * */
export function randomNumber (len) {
    var shuffleArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    len = Number(len)
    if (isNaN(len)) {
        console.log('error in len ')
        return false
    }
    if (!len) {
        len = 5
    }
    return shuffle(shuffleArr).slice(0, len)

    function shuffle (arr) {
        var len = arr.length
        for (var i = 0; i < len - 1; i++) {
            var idx = Math.floor(Math.random() * (len - i))
            var temp = arr[idx]
            arr[idx] = arr[len - i - 1]
            arr[len - i - 1] = temp
        }
        return arr
    }
}

export function commonErrorHandler (data) {
    let status = data.status
    switch (status) {
            case '214':
                removeCK()
                break
            default:
                Message({
                    message: data.message,
                    type: 'error',
                    duration: tipsTime
                })
                break
    }
}

export function copySucc () {
    Message({
        message: _('Copied to clipboard'),
        type: 'success',
        duration: tipsTime
    })
}

export function copyError () {
    Message({
        message: _('Failed to copy, please retry'),
        type: 'error',
        duration: tipsTime
    })
}

export function getURLParams () {
    let string = window.location.search
    let obj = {}
    string.slice(1).split('&').map(item => {
        if (item !== '') {
            let arr = item.split('=')
            obj[arr[0]] = arr[1]
        }
    })
    return obj
}
// 字符串替换 取url 数据
export function param2Obj (url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
        '"}'
    )
}

export function numberComma (source, length = 3) {
    source = String(source).split('.')
    source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{' + length + '})+$)', 'ig'), '$1,')
    return source.join('.')
}

function isThisLang (lang) {
    let source = 'en'
    if (typeof source === 'string') {
        return source.toLowerCase() === lang
    }
    return false
}

function isZhTw (source) {
    return isThisLang('zh-tw')
}

function isZhcn () {
    return isThisLang('zh-cn') || isThisLang('zh')
}

function isZhHk () {
    return isThisLang('zh-hk')
}

function getLocalStorageLanguage () {
    return localStorage.getItem('language')
}

export function setLocalStorageLanguage (lang) {
    localStorage.setItem('language', lang)
}

function getDefaultLanguage () {
    let localStorageLanguage = getLocalStorageLanguage()
    if (isZhTw() || isZhHk()) {
        return 'zhTw'
    }

    if (isZhcn()) {
        return 'zhCn'
    }

    if (localStorageLanguage) {
        return localStorageLanguage
    }

    return 'en'
}

export const defaultLanguage = getURLParams().language || getDefaultLanguage() || 'en'

export function structDom (msg = 'eduIndex') {
    let createSci = null
    let baseDes = null
    if (!document.getElementById('js_struct')) {
        createSci = document.createElement('script')
        baseDes = null
        createSci.setAttribute('type', 'application/ld+json')
        createSci.setAttribute('id', 'js_struct')
    } else {
        createSci = document.getElementById('js_struct')
    }
    if (msg === 'eduIndex') {
        createSci.innerHTML = `
        {
          "@context":"http://schema.org",
          "@type": "BreadcrumbList",
          "url": "https://www.katoto.cn/",
          "name": "katoto-小学试卷资源-小学教育资讯",
          "description": "katoto小学资源网，包括小学数学、小学语文、小学英语各科试卷，教育资料。小学热点新闻-小学教育资讯-小学教学反思-katoto网",
          "itemListElement": [
            {
                "@type": "ListItem", 
                "position": 1, 
                "item": {
                  "@id": "https://www.katoto.cn/eduIndex/Class1/",
                  "name": "小学一年级",
                  "image": "https://www.katoto.cn/static/img/tegs.cb9a15e.jpg"
                }
            },
            {
                "@type": "ListItem",
                "position": 2,
                "item": {
                    "@id": "https://www.katoto.cn/eduIndex/Class2/",
                    "name": "小学二年级",
                    "image": "https://www.katoto.cn/static/img/tegs.cb9a15e.jpg"
                }
            },
            {
                "@type": "ListItem",
                "position": 3,
                "item": {
                    "@id": "https://www.katoto.cn/eduIndex/Class3/",
                    "name": "小学三年级",
                    "image": "https://www.katoto.cn/static/img/tegs.cb9a15e.jpg"
                }
            },
            {
                "@type": "ListItem",
                "position": 4,
                "item": {
                    "@id": "https://www.katoto.cn/eduIndex/Class4/",
                    "name": "小学四年级",
                    "image": "https://www.katoto.cn/static/img/tegs.cb9a15e.jpg"
                }
            },
            {
                "@type": "ListItem",
                "position": 5,
                "item": {
                    "@id": "https://www.katoto.cn/eduIndex/Class5/",
                    "name": "小学五年级",
                    "image": "https://www.katoto.cn/static/img/tegs.cb9a15e.jpg"
                }
            },
            {
                "@type": "ListItem",
                "position": 6,
                "item": {
                    "@id": "https://www.katoto.cn/eduIndex/Class6/",
                    "name": "小学六年级",
                    "image": "https://www.katoto.cn/static/img/tegs.cb9a15e.jpg"
                }
            }
          ]
        }`
    } else if (msg === 'tuzhai') {
        baseDes = `
        {
          "@context":"http://schema.org",
          "@type": "BreadcrumbList", 
          "url": "https://www.katoto.cn/tuzhai",
          "name": "katoto图摘 - 每天十分钟，开心一整天",
          "description": "青年图摘 katoto图摘 小哲理 小温暖  囧图  暴走漫画  创意 新奇  糗事 搞笑gif  可爱卖萌 2B青年 邪恶 重口味 雷人 宅腐 猥琐 伤不起 潮流 恶搞 牛逼 蛋疼经痛 是不是 震惊了 碉堡了 凌乱了 吓尿了 不淡定了。",
          `
    } else if (msg === 'meitu') {
        baseDes = `
        {
          "@context":"http://schema.org",
          "@type": "BreadcrumbList", 
          "url": "https://www.katoto.cn/meitu",
          "name": "katoto美图 - 每天十张图，美丽一整天",
          "description": "美女图片大全_精选美女图片_katoto网",
          `
    } else if (msg === 'htmlnav') {
        baseDes = `
        {
          "@context":"http://schema.org",
          "@type": "BreadcrumbList", 
          "url": "https://www.katoto.cn/htmlnav",
          "name": "katoto前端网址-katoto靠谱的前端网址导航-前端开发导航-前端工具导航",
          "description": "前端网址导航是由katoto前端提供的专为前端开发者服务的网址导航产品，前端网址导航整理了国内外非常优秀的前端开发网站，并提供更多相关行业的网站网址，意图给到前端开发者一个完善而又良好的网址导航，是前端行业人员值得收藏的前端导航。",
          `
    } else if (msg === 'pmnav') {
        baseDes = `
        {
          "@context":"http://schema.org",
          "@type": "BreadcrumbList", 
          "url": "https://www.katoto.cn/pmnav",
          "name": "产品经理网址导航 产品经理,产品经理导航,设计师导航产品运营,产品设计,数据分析导航,产品经理网址导航,用户体验,交互设计",
          "description": "收录产品、运营、交互设计、用户体验、行业资讯、数据分析、电子商务、产品运营必备工具、国外优秀网站等相关网站。",
          `
    } else {
        baseDes = `
        {
          "@context":"http://schema.org",
          "@type": "BreadcrumbList", 
          "url": "https://www.katoto.cn/tuzhai",
          "name": "katoto图摘 - 每天十分钟，开心一整天",
          "description": "青年图摘 katoto图摘 小哲理 小温暖  囧图  暴走漫画  创意 新奇  糗事 搞笑gif  可爱卖萌 2B青年 邪恶 重口味 雷人 宅腐 猥琐 伤不起 潮流 恶搞 牛逼 蛋疼经痛 是不是 震惊了 碉堡了 凌乱了 吓尿了 不淡定了。",
          `
    }
    if (msg !== 'eduIndex') {
        createSci.innerHTML = `${baseDes}
        "itemListElement": [
            {
                "@type": "ListItem", 
                "position": 1, 
                "item": {
                  "@id": "https://www.katoto.cn/eduIndex/Class1",
                  "name": "小学一年级", 
                  "image": "" 
                }
            },
            {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@id": "https://www.katoto.cn/tuzhai/",
                  "name": "青年图摘",
                  "image": ""
                }
            },
            {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@id": "https://www.katoto.cn/movie/",
                  "name": "免费电影解析.",
                  "image": ""
                }
            }
          ]
        }`
    }

    if (!document.getElementById('js_struct')) {
        document.body.appendChild(createSci)
    }
}

export function selfNotify (val, typeVal = 'success') {
    Notification({
        dangerouslyUseHTMLString: true,
        type: typeVal,
        message: _(val),
        position: 'bottom-right',
        duration: 5000
    })
}

/**
 *  scrollTop 快速回到顶部
 */
export function scrollTop () {
    const c = document.documentElement.scrollTop || document.body.scrollTop
    if (c > 0) {
        window.requestAnimationFrame(scrollTop)
        window.scrollTop(0, c - c / 8)
    }
}
