<script>
// 以插件形式引入国际化组件
import zhCn from '../language/zh-cn'
import zhTw from '../language/zh-tw'

const MyPlugin = {}
const languagePackage = {
    zhCn,
    zhTw
}

window._ = string => string

MyPlugin.install = function (Vue, store) {
    // 注册全局翻译函数

    window._ = function () {
        let string = arguments[0] || ''
        let thisString = (languagePackage[store.state.language] && languagePackage[store.state.language][string]) || string

        if (arguments.length > 1) {
            for (let index = 1; index < arguments.length; index++) {
                thisString = thisString.replace(new RegExp('\\{' + (index - 1) + '\\}', 'g'), arguments[index])
            }
        }
        return thisString
    }

    // 注册组件公共翻译函数
    Vue.prototype._ = function () {
        return window._.apply(this, arguments)
    }
    // 注册组件公共相关函数
    Vue.prototype.$isZhCn = function () {
        return store.state.language === 'zhCn'
    }
    Vue.prototype.$isZhTw = function () {
        return store.state.language === 'zhTw'
    }
    Vue.prototype.$isEn = function () {
        return store.state.language === 'en'
    }

    // 注册全局lang翻译组件
    Vue.component('lang', {
        render: function (h) {
            if (this.$slots.default.length > 1) {
                console.error(`该lang标签暂不支持包含html, 请使用v-lang指令：${this.$slots.default}`)
            }
            return (
                <em domPropsInnerHTML={window._(this.$slots.default[0].text)}></em>
            )
        }
    })

    // 2. 添加全局翻译指令
    Vue.directive('lang', {
        bind: function (el, binding) {
            el.innerHTML = window._(binding.value || '')
        },
        inserted: function (el, binding) {
            el.innerHTML = window._(binding.value || '')
        },
        update: function (el, binding) {
            el.innerHTML = window._(binding.value || '')
        },
        componentUpdated: function (el, binding) {
            el.innerHTML = window._(binding.value || '')
        }
    })
}

export default MyPlugin
</script>


