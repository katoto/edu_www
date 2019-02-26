// 组合继承
// call 方法调用的是一个函数，其具有一个指定的this值
// call 方法的作用和apply 类似，就一个区别，call()方法接受的是若干个参数的列表，而apply() 方法接受的是一个包含多个参数的数组

// function Parent (value) {
//     this.val = value
// }
// Parent.prototype.getValue = function () {
//     console.log(this.val)
// }
// function Child (value) {
//     Parent.call(this, value)
// }
// Child.prototype = new Parent()

// const child = new Child(1)
// console.log(child)
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

// 洗牌算法
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
