<script>

import {tipsTime} from '~common/util'
import {Message} from 'element-ui'

const MyPlugin = {}

MyPlugin.install = function (Vue, store) {
    store.$error = Vue.prototype.$error = function (msg) {
        Message({
            message: msg,
            type: 'error',
            duration: tipsTime
        })
    }

    store.$success = Vue.prototype.$success = function (msg) {
        Message({
            message: msg,
            type: 'success',
            duration: tipsTime
        })
    }
}

export default MyPlugin
</script>


