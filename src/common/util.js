/**
 *  相关的工具函数
 */
import { Message, Notification } from 'element-ui'

export const src = 'pc'
export const tipsTime = 2000
export const ethUrl = 'https://etherscan.io/'
export const channel = 2000 // 暂时就sign 注册用到
//  社区地址 online
export const coinAffAddr = '0xfd76dB2AF819978d43e07737771c8D9E8bd8cbbF'
// 线下社区地址
// export const coinAffAddr = '0xb0555F2389d9Bf1389C8e548c60a6DDc77F3A4eE'

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

export function formateJackPot (money, poolAmount, poolRatio) {
    money = parseFloat(money)
    if (!poolAmount) {
        console.error('poolAmount error at formateJackPot')
        return 0
    }
    if (!poolRatio) {
        console.error('poolRatio error at formateJackPot')
        return 0
    }
    if (poolRatio && poolRatio[0] && poolRatio[1] && poolRatio[2] && poolRatio[3]) {
        if (money < parseFloat(poolRatio[0].value)) {
            return parseFloat((parseFloat(poolRatio[0].ratio) * parseFloat(poolAmount)).toFixed(5))
        }
        if (money < parseFloat(poolRatio[1].value)) {
            return parseFloat((parseFloat(poolRatio[1].ratio) * parseFloat(poolAmount)).toFixed(5))
        }
        if (money < parseFloat(poolRatio[2].value)) {
            return parseFloat((parseFloat(poolRatio[2].ratio) * parseFloat(poolAmount)).toFixed(5))
        }
        if (money <= parseFloat(poolRatio[3].value)) {
            return parseFloat((parseFloat(poolRatio[3].ratio) * parseFloat(poolAmount)).toFixed(5))
        }
    }
}

/*
 *   format_match  玩法选择
 * */
export function formatMatchAccount (match) {
    if (isNaN(match)) {
        return ''
    }
    match = match.toString()
    switch (match) {
    case '1101':
        return _('Lucky 11/P1')
    case '1102':
        return _('Lucky 11/P2')
    case '1103':
        return _('Lucky 11/P3')
    case '1104':
        return _('Lucky 11/P4')
    case '1105':
        return _('Lucky 11/P5')
    case '11051':
        return _('Super 5')
    }
}

export function formatTime (time, format = 'MM-dd HH:mm:ss') {
    if (isNaN(time)) {
        return false
    }
    let t = new Date(+time * 1000)
    let tf = function (i) {
        return (i < 10 ? '0' : '') + i
    }
    let tfAMPM = function (i) {
        if (~format.indexOf('AMPM')) {
            i = i % 12
            i = i || 12
        }
        return (i < 10 ? '0' : '') + i
    }
    let amName = function (hour) {
        return hour >= 12 ? 'PM' : 'AM'
    }
    return format.replace(/yyyy|MM|dd|HH|mm|ss|AMPM/g, function (a) {
        switch (a) {
        case 'yyyy':
            return tf(t.getFullYear())
        case 'MM':
            return tf(t.getMonth() + 1)
        case 'mm':
            return tf(t.getMinutes())
        case 'dd':
            return tf(t.getDate())
        case 'HH':
            return tfAMPM(t.getHours())
        case 'ss':
            return tf(t.getSeconds())
        case 'AMPM':
            return amName(t.getHours())
        }
    })
}

/*
 *   format_match  玩法选择
 * */
export function formatMatch (match) {
    if (isNaN(match)) {
        return ''
    }
    match = match.toString()
    switch (match) {
    case '1101':
        return _('P1')
    case '1102':
        return _('P2')
    case '1103':
        return _('P3')
    case '1104':
        return _('P4')
    case '1105':
        return _('P5')
    default:
        return _('Super 5')
    }
}

export function formateBalance (val = 0) {
    let newEth = null
    let isF = false
    if (isNaN(val) || isNaN(Number(val))) {
        console.error('formateBalance error' + val)
        return 0
    }
    val = Number(val)
    if (val < 0) {
        isF = true
        val = val * -1
    }
    if (val >= 10000) {
        return Number(val.toFixed(2))
    }
    let num = Number(val).toFixed(6)
    let index = num.indexOf('.')
    newEth = num.substr(0, num.length - index)
    return `${isF ? '-' : ''}${newEth}`
}

export function formateSlotBalance (val = 0) {
    return this.formateBalance(val)
}

export function formateJackpot (val = 0) {
    let newEth = null
    if (isNaN(val) || isNaN(Number(val))) {
        console.error('formateBalance error' + val)
        return 0
    }
    val = Number(val)
    if (val > 10000000) {
        newEth = (val / 100000000).toFixed(1) + '亿'
    } else if (val > 100000) {
        newEth = (val).toFixed(1)
    } else if (val > 100) {
        newEth = (val).toFixed(2)
    } else if (val > 10) {
        newEth = (val).toFixed(3)
    } else if (val > 1) {
        newEth = (val).toFixed(4)
    } else {
        newEth = (val).toFixed(5)
    }
    return newEth
}

/*
 *   金币类型
 * */
export function formateCoinType (type = '2001') {
    if (!type) {
        console.error('formateCoinType type error')
        return false
    }
    type = type.toString()
    switch (type) {
    case '2001':
        return 'ETH'
    case '1001':
        return 'BTC'
    case '2000':
        return 'CC'
    default:
        return 'ETH'
    }
}

export function formateCoinAddr (addr) {
    addr = addr.toString()
    return addr.slice(0, 4) + '***' + addr.slice(-4)
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
 *   formate_moneyFlow  格式化 流水类型
 *   // 明细状态 1：recharge   2：bet    3：prize    4:withdraw
 * */
export function formateMoneyFlow (flowtype, lotid) {
    if (isNaN(flowtype)) {
        console.error('formate_moneyFlow error' + flowtype)
        return false
    }
    flowtype = flowtype.toString()
    switch (flowtype) {
    case '1':
        if (lotid === '1') {
            return _('Lucky11 Bet')
        } else if (lotid === '2') {
            return _('LuckyCoin Bet')
        }
        return _('Bet') // 投注消费
    case '2':
        if (lotid === '1') {
            return _('Lucky11 Prize')
        } else if (lotid === '2') {
            return _('LuckyCoin Prize')
        }
        return _('Prize') // 投注中奖
    case '3':
        return _('Bet Refund') // 投注退款
    case '4':
        return _('Withdrawal') // 提款扣除
    case '5':
        return _('fee') // 提款手续费
    case '6':
        return _('Withdrawal Refund') // 提款失败退款
    case '7':
        return _('fee refund') // 提款失败手续退款
    case '8':
        return _('Top-up') // 充值
    case '9':
        return _('Top-up Refund') // 充值失败扣款
    case '10':
        return _('Registration') // 注册送
    case '11':
        return _('Inviting') // 邀请送
    case '12':
        return _('World cup') // 世界杯
    case '13':
        return _('World cup') // 世界杯中奖
    case '14':
        return _('LuckySlot Bet') // 老虎机投注
    case '15':
        return _('LuckySlot Prize') // 老虎机中奖
    case '16':
    case '17':
        return _('Bonus') // 每日送1CC
    case '18':
        return _('Sign gift') // 连续七天送
    case '19':
        return _('Top-Up Bonus') // 首充送
    case '20':
        return _('LuckyPoker Bet') // 幸运扑克投注
    case '21':
        return _('LuckyPoker Prize')// 幸运扑克中奖
    case '22':
        return _('Promo-Halloween') // 万圣节活动送
    default:
        return _('Bet')
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

/* float 浮点精度问题  0.001 * 9 */
export function formatFloat (f, digit = 5) {
    f = parseFloat(f)
    let m = Math.pow(10, digit)
    return Math.round(f * m, 10) / m
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
    // let source = navigator.language || navigator.browserLanguage || navigator.userLanguage || 'en'
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

// 浮点数除法
export function accDiv (arg1, arg2) {
    let t1 = 0
    let t2 = 0
    let r1
    let r2
    try {
        t1 = arg1.toString().split('.')[1].length
    } catch (e) { }
    try {
        t2 = arg2.toString().split('.')[1].length
    } catch (e) { }
    r1 = Number(arg1.toString().replace('.', ''))
    r2 = Number(arg2.toString().replace('.', ''))
    return (r1 / r2) * Math.pow(10, t2 - t1)
}

// 浮点数乘法
export function accMul (arg1, arg2) {
    let m = 0
    let s1 = arg1.toString()
    let s2 = arg2.toString()
    try {
        m += s1.split('.')[1].length
    } catch (e) { }
    try {
        m += s2.split('.')[1].length
    } catch (e) { }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}

// 浮点数减法
export function accSub (arg1, arg2) {
    let r1
    let r2
    let m
    let n
    try {
        r1 = arg1.toString().split('.')[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split('.')[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2)) // last modify by deeka //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2
    return ((arg1 * m - arg2 * m) / m).toFixed(n)
}

// 浮点数加法
export function accAdd (arg1, arg2) {
    let r1
    let r2
    let m
    let c
    try {
        r1 = arg1.toString().split('.')[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split('.')[1].length
    } catch (e) {
        r2 = 0
    }
    c = Math.abs(r1 - r2)
    m = Math.pow(10, Math.max(r1, r2))
    if (c > 0) {
        var cm = Math.pow(10, c)
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace('.', ''))
            arg2 = Number(arg2.toString().replace('.', '')) * cm
        } else {
            arg1 = Number(arg1.toString().replace('.', '')) * cm
            arg2 = Number(arg2.toString().replace('.', ''))
        }
    } else {
        arg1 = Number(arg1.toString().replace('.', ''))
        arg2 = Number(arg2.toString().replace('.', ''))
    }
    return (arg1 + arg2) / m
}

export const defaultLanguage = getURLParams().language || getDefaultLanguage() || 'en'

export function mobileCheck () {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
    })(navigator.userAgent || navigator.vendor || window.opera)
    return check
};

export function formatNum (num, bit = 5) {
    return accDiv(Math.floor(accMul(Number(num), Math.pow(10, bit))), Math.pow(10, bit))
}

export function formatUSD (price, num) {
    price = Number(price)
    num = Number(num)
    var total = accMul(price, num)
    return numberComma(formatNum(total, 1))
}

export function getElementAbsolutePosition (element, parentElement = window.document) {
    var parent = element.offsetParent
    let left = element.offsetLeft
    let top = element.offsetTop
    while (parent !== null && parentElement !== parent) {
        left = accAdd(left, parent.offsetLeft)
        top = accAdd(top, parent.offsetTop)
        parent = parent.offsetParent
    }
    return {
        left,
        top
    }
}

export function getElementCenterPosition (element, offset) {
    let relativePosition = offset
    return {
        left: accAdd(relativePosition.left, accDiv(element.offsetWidth, 2)),
        top: accAdd(relativePosition.top, accDiv(element.offsetHeight, 2))
    }
}

export function structDom (msg = 'home') {
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
    if (msg === 'home') {
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
    if (msg === 'luckySlot') {
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
                  "@id": "https://www.coinsprize.com/luckySlot",
                  "name": "${_('Recent')}",
                  "image": ""
                }
            },
            {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@id": "https://www.coinsprize.com/luckySlot",
                  "name": "${_('luckySlot')}",
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

/*
 *      字节长度
 *      @return 字节长度
 * */
export function getByteLen (str) {
    if (!str) return 0
    if (typeof str !== 'string') {
        str += ''
    }
    return str.replace(/[^\x00-\xff]/g, '01').length
}

/*
 *      切割字节长度字符
 *      @return 字节长度
 * */
export function cutStr (str, len) {
    let result = ''
    let strlen = str.length // 字符串长度
    let chrlen = str.replace(/[^\x00-\xff]/g, '**').length // 字节长度
    if (chrlen <= len) { return str }
    for (var i = 0, j = 0; i < strlen; i++) {
        var chr = str.charAt(i)
        if (/[\x00-\xff]/.test(chr)) {
            j++ // ascii码为0-255，一个字符就是一个字节的长度
        } else {
            j += 2 // ascii码为0-255以外，一个字符就是两个字节的长度
        }
        if (j <= len) { // 当加上当前字符以后，如果总字节长度小于等于L，则将当前字符真实的+在result后
            result += chr
        } else { // 反之则说明result已经是不拆分字符的情况下最接近L的值了，直接返回
            return result
        }
    }
}

export function getCCAcount (userInfo) {
    if (userInfo && userInfo.accounts && userInfo.accounts.length >= 1) {
        let accounts = this.userInfo.accounts
        for (let index = 0; index < accounts.length; index++) {
            if (accounts[index].cointype === '2000') {
                return Number(accounts[index].balance)
            }
        }
    }
    return 0
}

export function getCCDeductionMoney (total, rate) {
    let value = Number(total)
    if (value && !isNaN(value) && value > 0) {
        if (value < 0.0001) {
            return accMul(value, rate).toFixed(18).replace(/\.?0+$/, '')
        } else {
            return formatNum(accMul(value, rate), 18).toString().replace(/\.?0+$/, '')
        }
    }
    return '0'
}

/*
 *   正则 加入a
 * */
String.prototype.httpParse = function () {
    let htmlDecode = (html) => {
        var temp = document.createElement('div')
        if (typeof html !== 'String') {
            html.toString()
        }
        (temp.textContent != undefined) ? (temp.textContent = html) : (temp.innerText = html)
        var output = temp.innerHTML
        temp = null
        return output
    }
    var reg = /((http|ftp|https):\/\/)?[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/g
    return htmlDecode(this).replace(reg, (a) => {
        if (!a.indexOf('http')) {
            return `<a class="link" href="${a}" target="_blank">${a}</a>`
        }
        return `${a}`
        // else {
        //     return `<a class="link" href="http://${a}" target="_blank">${a}</a>`
        // }
    })
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
