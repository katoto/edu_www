/**
 *  相关的工具函数
 */

import {Message} from 'element-ui'

export const src = 'pc'
export const tipsTime = 3000
export const ethUrl = 'https://etherscan.io/'
export const channel = 2000 // 暂时就sign 注册用到

export function mapActions(acts, ns) {
    const aTypes = {}
    const actions = {}
    Object.keys(acts).forEach((key) => {
        aTypes[key] = [ns, key].join('/')
        actions[aTypes[key]] = acts[key]
    })
    return {actions, aTypes}
}

export const platform = 'pc'
// export const platform = (function () {
// return ~navigator.userAgent.indexOf('iPhone') ? 'ios' : 'android'
// })()

export function mapMutations(muts, ns) {
    const mTypes = {}
    const mutations = {}
    Object.keys(muts).forEach((key) => {
        mTypes[key] = [ns, key].join('/')
        mutations[mTypes[key]] = muts[key]
    })
    return {mutations, mTypes}
}

export function wait(time) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), time)
    })
}

export const isWeiX = (function () {
    let ua = navigator.userAgent.toLowerCase()
    return ~ua.indexOf('micromessenger')
})()

const CK = 'block_ck'
export const isMobile = /applewebkit.*mobile.*/.test(window.navigator.userAgent.toLowerCase())

export function getCK() {
    return localStorage.getItem(CK)
}

export function setCK(ck) {
    return localStorage.setItem(CK, ck)
}

export function removeCK() {
    return localStorage.setItem(CK, '')
}

export function isLog() {
    return !((getCK() === '0' || !getCK() || getCK() === 'null' || getCK() === ''))
}

export function formateJackPot(money, poolAmount, poolRatio) {
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
export function formatMatchAccount(match) {
    if (isNaN(match)) {
        return ''
    }
    match = match.toString()
    switch (match) {
        case '1101':
            return _('Lucky 11/C1')
        case '1102':
            return _('Lucky 11/C2')
        case '1103':
            return _('Lucky 11/C3')
        case '1104':
            return _('Lucky 11/C4')
        case '1105':
            return _('Lucky 11/C5')
        case '11051':
            return _('Super 5')
    }
}

export function formatTime(time, format) {
    if (format === undefined || format == null) {
        format = 'MM-dd HH:mm:ss'
    }
    if (isNaN(time)) {
        return false
    }
    let t = new Date(+time * 1000)
    let tf = function (i) {
        return (i < 10 ? '0' : '') + i
    }
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
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
                return tf(t.getHours())
            case 'ss':
                return tf(t.getSeconds())
        }
    })
}

/*
 *   format_match  玩法选择
 * */
export function formatMatch(match) {
    if (isNaN(match)) {
        return ''
    }
    match = match.toString()
    switch (match) {
        case '1101':
            return _('C1')
        case '1102':
            return _('C2')
        case '1103':
            return _('C3')
        case '1104':
            return _('C4')
        case '1105':
            return _('C5')
        default:
            return _('Super 5')
    }
}

export function formateBalance(val = 0) {
    let newEth = null
    if (isNaN(val) || isNaN(Number(val))) {
        console.error('formateBalance error' + val)
        return 0
    }
    val = Number(val)
    if (val > 10000000) {
        newEth = (val / 100000000).toFixed(1) + '亿'
    } else if (val > 100000) {
        newEth = (val / 10000).toFixed(1) + '万'
    } else if (val > 1000) {
        newEth = parseFloat((val).toFixed(0))
    } else if (val > 100) {
        newEth = (val).toFixed(3)
    } else if (val > 10) {
        newEth = (val).toFixed(4)
    } else if (val > 1) {
        newEth = (val).toFixed(5)
    } else {
        newEth = (val).toFixed(6)
    }
    return newEth
}

export function formateSlotBalance(val = 0) {
    let newEth = null
    if (isNaN(val) || isNaN(Number(val))) {
        console.error('formateSlotBalance error' + val)
        return 0
    }
    val = Number(val)
    if (val > 10000000) {
        newEth = (val / 100000000).toFixed(1) + '亿'
    } else if (val > 100000) {
        newEth = (val / 10000).toFixed(1) + '万'
    } else if (val > 1000) {
        newEth = parseFloat((val).toFixed(0))
    } else if (val > 100) {
        newEth = parseFloat((val).toFixed(3))
    } else if (val > 10) {
        newEth = parseFloat((val).toFixed(4))
    } else if (val > 1) {
        newEth = parseFloat((val).toFixed(5))
    } else {
        newEth = parseFloat((val).toFixed(6))
    }
    return newEth
}

export function formateJackpot(val = 0) {
    let newEth = null
    if (isNaN(val) || isNaN(Number(val))) {
        console.error('formateBalance error' + val)
        return 0
    }
    val = Number(val)
    if (val > 10000000) {
        newEth = (val / 100000000).toFixed(1) + '亿'
    } else if (val > 100000) {
        // newEth = (val / 10000).toFixed(1) + '万'
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
export function formateCoinType(type = '2001') {
    type = type.toString()
    switch (type) {
        case '2001':
            return 'ETH'
        case '1001':
            return 'BTC'
        default:
            return 'ETH'
    }
}

export function formateEmail(email, isFull) {
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
export function formateMoneyFlow(flowtype = '1') {
    if (isNaN(flowtype)) {
        console.error('formate_moneyFlow error' + flowtype)
        return false
    }
    flowtype = flowtype.toString()
    switch (flowtype) {
        case '1':
            return _('Bet') // 投注消费
        case '2':
            return _('Prize') // 投注中奖
        case '3':
            return _('Bet refund')// 投注退款
        case '4':
            return _('withdraw') // 提款扣除
        case '5':
            return _('fee')// 提款手续费
        case '6':
            return _('withdrawal refund')// 提款失败退款
        case '7':
            return _('fee refund')// 提款失败手续退款
        case '8':
            return _('deposit')// 充值
        case '9':
            return _('deposit refund')// 充值失败扣款
        case '10':
            return _('Registration')// 注册送
        case '11':
            return _('Inviting')// 邀请送
        case '12':
            return _('World cup')// 世界杯
        case '13':
            return _('World cup')// 世界杯中奖
        case '14':
            return _('Slots Bet')// 老虎机投注
        case '15':
            return _('Slots Prize')// 老虎机中奖
        default:
            return _('Bet')
    }
}

/*
 *  11个数中 随机 选出 len 个
 *  @params  len
 *  shuffle()  洗牌算法
 * */
export function randomNumber(len) {
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

    function shuffle(arr) {
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

export function commonErrorHandler(data) {
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

export function copySucc() {
    Message({
        message: 'Copied to clipboard',
        type: 'success'
    })
}

export function copyError() {
    Message({
        message: 'Failed to copy, please retry',
        type: 'success'
    })
}

/* float 浮点精度问题  0.001 * 9 */
export function formatFloat(f, digit = 5) {
    f = parseFloat(f)
    let m = Math.pow(10, digit)
    return Math.round(f * m, 10) / m
}

export function getURLParams() {
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

export function numberComma(source, length = 3) {
    source = String(source).split('.')
    source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{' + length + '})+$)', 'ig'), '$1,')
    return source.join('.')
}

function isThisLang(lang) {
    // let source = navigator.language || navigator.browserLanguage || navigator.userLanguage || 'en'
    let source = 'en'
    if (typeof source === 'string') {
        return source.toLowerCase() === lang
    }
    return false
}

function isZhTw(source) {
    return isThisLang('zh-tw')
}

function isZhcn() {
    return isThisLang('zh-cn') || isThisLang('zh')
}

function isZhHk() {
    return isThisLang('zh-hk')
}

function getDefaultLanguage() {
    if (isZhTw() || isZhHk()) {
        return 'zhTw'
    }

    if (isZhcn()) {
        return 'zhCn'
    }

    return 'en'
}

// 浮点数除法
export function accDiv(arg1, arg2) {
    let t1 = 0
    let t2 = 0
    let r1
    let r2
    try {
        t1 = arg1.toString().split('.')[1].length
    } catch (e) {
    }
    try {
        t2 = arg2.toString().split('.')[1].length
    } catch (e) {
    }
    r1 = Number(arg1.toString().replace('.', ''))
    r2 = Number(arg2.toString().replace('.', ''))
    return (r1 / r2) * Math.pow(10, t2 - t1)
}

// 浮点数乘法
export function accMul(arg1, arg2) {
    let m = 0
    let s1 = arg1.toString()
    let s2 = arg2.toString()
    try {
        m += s1.split('.')[1].length
    } catch (e) {
    }
    try {
        m += s2.split('.')[1].length
    } catch (e) {
    }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}

// 浮点数减法
export function accSub(arg1, arg2) {
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
export function accAdd(arg1, arg2) {
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

export function mobileCheck() {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
    })(navigator.userAgent || navigator.vendor || window.opera)
    return check
};

export function formatNum(num, bit = 5) {
    return accDiv(Math.floor(accMul(Number(num), Math.pow(10, bit))), Math.pow(10, bit))
}

export function formatUSD(price, num) {
    price = Number(price)
    num = Number(num)
    var total = accMul(price, num)
    return numberComma(formatNum(total, 3))
}

export function structDom(msg = 'home') {
    let createSci = document.createElement('script')
    createSci.setAttribute('type', 'application/ld+json')
    if (msg === 'home') {
        createSci.innerHTML = `
        {
          "@context":"http://schema.org",
          "@type": "BreadcrumbList", 
          "url": "https://www.coinsprize.com/",   
          "name": "${_('Coinsprize-the fair game platform for casino games,based on blockchain technology')}",
          "image": "http://www.coinsprize.com/images/sprize/CoinsprizeLogo.png",    
          "description": "${_('Coinsprize is the world\'s first fair game platform based on blockchain technology.We have provided provably fair,de-centralized Ethereum,smart-contract,high betting casino games.')}",   
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
                  "@id": "https://www.coinsprize.com/slot/",
                  "name": "${_('Slot')}",
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
    }
    if (msg === 'lucky11') {

    }

    return createSci

}
