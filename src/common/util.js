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

export function structDom (msg = 'movie') {
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
    if (msg === 'movie') {
        createSci.innerHTML = `
        {
          "@context":"http://schema.org",
          "@type": "BreadcrumbList", 
          "url": "https://www.coinsprize.com/",   
          "name": "${_('Coinsprize-the fair game platform for casino games,based on blockchain technology')}",
          "image": "http://www.coinsprize.com/images/sprize/CoinsprizeLogo.png",
          "description": "${_('Coinsprize is a blockchain-based gaming platform with openness, transparency and checkable smart contracts. Players can get rewards from games. Bitcoin and Ethereum are supported by various games including high frequency Ether games, lotteries, poker games and bid games.')}",
          "itemListElement": [
            {
                "@type": "ListItem", 
                "position": 1, 
                "item": {
                  "@id": "https://www.coinsprize.com/lucky11/",
                  "name": "${_('Lucky11')}", 
                  "image": "http://www.coinsprize.com/images/sprize/logo-115.png" 
                }
            },
            {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@id": "https://www.coinsprize.com/luckySlot/",
                  "name": "${_('luckySlot')}",
                  "image": "http://www.coinsprize.com/images/sprize/logo-slot.png"
                }
            },
            {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@id": "https://www.coinsprize.com/luckycoin/",
                  "name": "${_('LuckyCoin')}",
                  "image": "http://www.coinsprize.com/images/sprize/logo-luckyCoin.png"
                }
            }
          ]
        }`
    } else {
        baseDes = `
        {
          "@context":"http://schema.org",
          "@type": "BreadcrumbList", 
          "url": "https://www.coinsprize.com/",   
          "name": "${_('{0} Draw Result|Information|Announcements|Records -- Coinsprize', msg)}",
          "image": "http://www.coinsprize.com/images/sprize/CoinsprizeLogo.png",
          "description": "${_('{0}, released by Coinsprize, is a high frequency Ether game based on blockchain. Draw result, draw details, announcements and draw history of {0} can be checked on this page.', msg)}",
          `
    }
    if (msg === 'lucky11') {
        createSci.innerHTML = `${baseDes}
        "itemListElement": [
            {
                "@type": "ListItem", 
                "position": 1, 
                "item": {
                  "@id": "https://www.coinsprize.com/help",
                  "name": "${_('Help Center')}", 
                  "image": "" 
                }
            },
            {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@id": "https://www.coinsprize.com/drawNumber",
                  "name": "${_('Draw Number')}",
                  "image": ""
                }
            },
            {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@id": "https://www.coinsprize.com/lucky11",
                  "name": "${_('Recent Wins')}",
                  "image": ""
                }
            }
          ]
        }`
    }
    if (msg === 'luckycoin') {
        createSci.innerHTML = `${baseDes}
        "itemListElement": [
            {
                "@type": "ListItem", 
                "position": 1, 
                "item": {
                  "@id": "https://www.coinsprize.com/help",
                  "name": "${_('Help Center')}", 
                  "image": "" 
                }
            },
            {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@id": "https://www.coinsprize.com/luckycoin/drawHistory",
                  "name": "${_('Draw History')}",
                  "image": ""
                }
            },
            {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@id": "https://www.coinsprize.com/luckycoin",
                  "name": "${_('Win Instant Reward')}",
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
