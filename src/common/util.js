/**
 *  相关的工具函数
 */

import Cookies from 'js-cookie'
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

export function getCK () {
    // return Cookies.get(CK)
    return localStorage.getItem(CK)
}

export function setCK (ck) {
    localStorage.setItem(CK, ck)
    return Cookies.set(CK, ck)
}

export function removeCK () {
    localStorage.setItem(CK, null)
    return Cookies.remove(CK)
}

export function isLog () {
    return !((getCK() === '0' || !getCK()))
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
        return 'Lucky 11/C1'
    case '1102':
        return 'Lucky 11/C2'
    case '1103':
        return 'Lucky 11/C3'
    case '1104':
        return 'Lucky 11/C4'
    case '1105':
        return 'Lucky 11/C5'
    case '11051':
        return 'Super 5'
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

// export const format_time = formatTime

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
        return 'C1'
    case '1102':
        return 'C2'
    case '1103':
        return 'C3'
    case '1104':
        return 'C4'
    case '1105':
        return 'C5'
    default:
        return 'Super 5'
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
            if (regArr[1] && regArr[1].length > 6) {
                email = regArr[1].slice(0, 2) + '**' + regArr[1].slice(-3) + regArr[2]
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
        return 'bet' // 投注消费
    case '2':
        return 'prize' // 投注中奖
    case '3':
        return 'bet refund'// 投注退款
    case '4':
        return 'withdraw' // 提款扣除
    case '5':
        return 'fee'// 提款手续费
    case '6':
        return 'withdrawal refund'// 提款失败退款
    case '7':
        return 'fee refund'// 提款失败手续退款
    case '8':
        return 'deposit'// 充值
    case '9':
        return 'deposit refund'// 充值失败扣款
    case '10':
        return 'Registration'// 注册送
    case '11':
        return 'Inviting'// 邀请送
    case '12':
        return 'World cup'// 世界杯
    case '13':
        return 'World cup'// 世界杯中奖
    default:
        return 'bet'
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

export function copySucc(){
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
