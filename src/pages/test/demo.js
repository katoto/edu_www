import { Resolver } from 'dns'

// 组合继承
// call 方法调用的是一个函数，其具有一个指定的this值
// call 方法的作用和apply 类似，就一个区别，call()方法接受的是若干个参数的列表，而apply() 方法接受的是一个包含多个参数的数组

function Parent (value) {
    this.val = value
}
Parent.prototype.getValue = function () {
    console.log(this.val)
}
function Child (value) {
    Parent.call(this, value)
}
Child.prototype = new Parent()

const child = new Child(1)
console.log(child)
// 缺点子类的原型上多了不需要的父类属性，存在内存上的浪费
// 寄生组合继承
// function Parent (value) {
//     this.val = value
// }
// Parent.prototype.getValue = function () {
//     console.log(this.val)
// }
// function Child (value) {
//     Parent.call(this, value)
// }
// // 自己弄原型
// Child.prototype = Object.create(Parent.prototype, {
//     constructor: {
//         value: Child,
//         enumerable: false,
//         writable: true,
//         configurable: true
//     }
// })
// const ch = new Child(1)
// ch.getValue()

// class Parent {
//     constructor (value) {
//         this.val = value
//     }
//     getValue () {
//         console.log(this.val)
//     }
// }
// class Child extends Parent {
//     constructor (value) {
//         super(value)
//         this.val = value
//     }
// }

// ajax 封装
// var $ = {
//     params: function (params = {}) {
//         var data = ''
//         if (Object.prototype.toString.call(params) !== '[object Object]') return false
//         Reflect.ownKeys(params).forEach((item) => {
//             data += item + '=' + params[item] + '&'
//         })
//         return data.slice(0, -1)
//     },
//     ajax: function (options) {
//         var xhr = new XMLHttpRequest()
//         var type = options.type || 'get'
//         var url = options.url || location.pathname
//         var data = this.params(options.data)
//         var callback = options.succsee
//         if (type === 'get') {
//             url = url + '?' + data
//             data = null
//         }
//         xhr.open(type, url)
//         if (type === 'post') {
//             xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
//         }
//         xhr.send(data)
//         xhr.onreadystatechange = function () {
//             if (xhr.readyState === 4 && xhr.status === 200) {
//                 var contentType = xhr.getResponseHeader('Content-Type')
//                 var data = xhr.responseText
//                 if (contentType.indexOf('json') !== -1) {
//                     data = JSON.parse(data)
//                 }
//                 callback(data)
//             } else {
//                 options.error('请求失败')
//             }
//         }
//     }
// }
// $.params({a: 1, b: 3, c: 5})

// jsonp 利用script 可跨域性质
// function jsonp (url, fn) {
//     var fnName = '__jsonFn' + Math.random().toString().replace('.', '')
//     var script = document.createElement('script')
//     var head = document.head
//     script.src = url + '?callback=' + fnName
//     window[fnName] = function (data) {
//         fn(data)
//         delete window[fnName]
//         head.removeChild(script)
//     }
//     head.appendChild(script)
// }

// url 处理
// let urlObj = (function () {
//     let urlName = window.location.href
//     let search = urlName.slice(urlName.indexOf('?'))
//     let urlArr = search.replace(/^\?/, '').split('&')
//     let s = null
//     let returnObj = {}
//     for (let i = 0;i < urlArr.length;i++) {
//         if (!urlArr[i]) continue
//         s = urlArr[i].split('=')
//         returnObj[s[0]] = s[1]
//     }
//     return returnObj
// })()

// 洗牌算法 ?
function shuffle (arr) {
    var len = arr.length
    for (var i = 0;i < len - 1;i++) {
        var idx = Math.floor(Math.random() * (len - i))
        var temp = arr[idx]
        arr[idx] = arr[len - i - 1]
        arr[len - i - 1] = temp
    }
    return arr
}

// 数组乱序
var arr = [1, 2, 3, 4, 5]
arr.sort(function () {
    return Math.random() - 0.5
})

// 冒泡排序 n(n-1)/2
// 解析：1.比较相邻的两个元素，如果前一个比后一个大，则交换位置。
// 2.第一轮的时候最后一个元素应该是最大的一个。
// 3.按照步骤一的方法进行相邻两个元素的比较，这个时候由于最后一个元素已经是最大的了，所以最后一个元素不用比较。
function sort (ele) {
    for (var i = 0;i < ele.length - 1 ;i++) {
        for (var j = 0;j < ele.length - 1 - i;j++) {
            if (ele[j] > ele[j + 1]) {
                var temp = ele[j]
                ele[j] = ele[j + 1]
                ele[j + 1] = temp
            }
        }
    }
}

// 快速排序
// 1.从数列中挑出一个元素，称为 “基准”（pivot）;
// 2.重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
// 3.递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序；

function quickSort (ele) {
    if (ele.length <= 1) {
        return ele
    }
    var centIndex = Math.floor(ele.length / 2)
    var cent = ele.splice(centIndex, 1)[0]
    var left = []
    var right = []
    for (var i = 0;i < ele.length;i++) {
        if (ele[i] < cent) {
            left.push(ele[i])
        } else {
            right.push(ele[i])
        }
    }
    return quickSort(left).concat([cent], quickSort(right))
}

// async function f () {
//     await p
//     console.log('ok')
// }
// // =====
// function f () {
//     return Resolver(p).then(() => {
//         console.log('ok')
//     })
// }

let Type = (function () {
    let type = {}
    let typeArr = ['String', 'Number', 'Object', 'Array', 'Undefined', 'Null', 'Symbol']
    for (let i = 0;i < typeArr[i].length;i++) {
        type['Is' + typeArr[i]] = function (obj) {
            return Object.prototype.toString.call(obj) === '[object typeArr[i]'
        }
    }
    return type
})()

function deepClone (obj) {
    function isObject (o) {
        return (typeof o === 'object' || typeof o === 'function') && o !== null
    }
    if (!isObject(obj)) {
        return new Error('')
    }
    let isArray = Array.isArray(obj)
    let newObj = isArray ? [...obj] : {...obj}
    Reflect.ownKeys(newObj).forEach((key) => {
        newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
    })
    return newObj
}

function debounce (func, delay = 500) {
    let timer = null
    return function (args) {
        let that = this
        let _args = args
        if (timer) clearTimeout(timer)
        timer = setTimeout(function () {
            func.call(that, _args)
        }, delay)
    }
}

if (typeof Object.assign2 !== 'function') {
    Object.defineProperty(Object, 'assign2', {
        value: function () {},
        writable: true,
        configurable: true
    })
}
