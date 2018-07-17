/**
 *  相关的工具函数
 */

import {Message} from 'element-ui'

export const src = 'pc'
export const tipsTime = 3000
export const ethUrl = 'https://etherscan.io/'
export const channel = 2000 // 暂时就sign 注册用到

export function mapActions (acts, ns) {
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

export function mapMutations (muts, ns) {
    const mTypes = {}
    const mutations = {}
    Object.keys(muts).forEach((key) => {
        mTypes[key] = [ns, key].join('/')
        mutations[mTypes[key]] = muts[key]
    })
    return {mutations, mTypes}
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

export function formatTime (time, format) {
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
export function formatMatch (match) {
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

export function formateBalance (val = 0) {
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
    } else {
        newEth = (val).toFixed(5)
        // newEth = Math.floor(val * 100000) / 100000
    }
    return newEth
}

export function formateSlotBalance (val = 0) {
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
    } else {
        newEth = parseFloat((val).toFixed(5))
    }
    return newEth
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
export function formateCoinType (type = '2001') {
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
export function formateMoneyFlow (flowtype = '1') {
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
        message: 'Copied to clipboard',
        type: 'success'
    })
}
export function copyError () {
    Message({
        message: 'Failed to copy, please retry',
        type: 'success'
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

function getDefaultLanguage () {
    if (isZhTw() || isZhHk()) {
        return 'zhTw'
    }

    if (isZhcn()) {
        return 'zhCn'
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
export function accMul (arg1, arg2) {
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
