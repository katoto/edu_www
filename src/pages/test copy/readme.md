<!-- <template>
    <div>
      <section>
        <p>测试父子组件通信</p>
        <Signal1 id="123" size="small" data-id='123' @abc="aa"></Signal1>
      </section>
    </div>
</template>
<script>
import Signal1 from '~/pages/test/components/Signal1.vue'
// $emit 和$no 的使用
// mixins 混合
// vue 组件渲染顺序是由内而外，(父组件的created 先于子组件的mounted)

// $set 有些会遇到不响应的情况 用到场景
// 1、由于javascript 的限制，vue 不能检测以下变动的数组
// 当利用索引直接设置一个项时， eg this.items[index] = value
// 修改数组的长度是，eg vm.items.length = newLength
// 2、由于js 的限制，vue不能检测对象属性的添加或删除

// computed 如果为function 形式，默认使用的是它的get 方法，当写为object 的，即set get 方法
// computed:{
//     fullName(){
//         return ******
//     }
// }
// computed:{
//     fullName:{
//         set(){
//         },
//         get(){
//         }
//     }
// }

export default {
    data () {
        return {
            show: false,
            items: ['a', 'b', 'c', 'c']
        }
    },
    mixins: [mixinsUser],
    components: {
        iButton,
        Signal1
    },
    methods: {
        handleShow () {
            let index = 1
            this.items[index] = 'f'
            this.items.length = 5
            // 也可以修改原数组
            // const data = [...this.items]
            // data[1] = 'fdsfs'
            // this.items = data

            // this.$set(this.items, 1, 'ff')
            // this.$set(this.items, b, 'ff')
            this.show = true
            // undefined
            console.log(this.$refs.node)
            this.$nextTick(() => {
                // dom
                console.log(this.$refs.node)
            })
        },
        emitFn () {
            this.$emit('test', '219')
        }
    },
    // provide: {
    //     name: 'Asesn'
    // }
    provide () {
        return {
            app: this
        }
    },
    mounted () {
        this.aa()
        this.bb()
        // $no 监听了自己触发的自定义事件
        this.$on('test', (text) => {
            window.alert(text)
        })
    }
}
</script> -->
