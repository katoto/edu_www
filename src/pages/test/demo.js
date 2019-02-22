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
