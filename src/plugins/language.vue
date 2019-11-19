<script>
// 国际化组件
import zhCn from '../language/zh-cn'
const MyPlugin = {}
const languagePackage = {
  zhCn,
  en: zhCn
}

window._ = null

MyPlugin.install = function(Vue, store) {
  window._ = function() {
    let string = arguments[0] || ''
    let thisString = (languagePackage[store.state.language] && languagePackage[store.state.language][string]) || string
    //  带变量
    if (arguments.length > 1) {
      for (let index = 1; index < arguments.length; index++) {
        thisString = thisString.replace(new RegExp('\\{' + (index - 1) + '\\}', 'g'), arguments[index])
      }
    }
    return thisString
  }
  // vue 注册公共组件
  Vue.prototype._ = function() {
    return window._.apply(this, arguments)
  }
  // 往store 注入语言
  //   Vue.prototype.$isZhcn = function () {
  //     return store.state.language === 'zhCn'
  //   }
  //   Vue.prototype.$lang = $lang

  // <lang></lang> 实现标签slot
  Vue.component('lang', {
    render: function(h) {
      if (this.$slots.default.length > 1) {
        console.log('error')
      }
      // return (<em domPropsInnerHTML={window._(this.$slots.default[0].text)} ></em>)
      return ''
    }
  })

  // 添加全局指令 v-XX 这种
  Vue.directive('lang', {
    bind: function(el, binding) {
      el.innerHTML = window._(binding.value || '')
    },
    inserted: function(el, binding) {
      el.innerHTML = window._(binding.value || '')
    },
    update: function(el, binding) {
      el.innerHTML = window._('')
    }
  })
}

export default MyPlugin
</script>
