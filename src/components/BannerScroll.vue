<template>
    <div>
        <slot>
        </slot>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                currLen: null,
                scrollInterval: null
            }
        },
        methods: {
            hitListBroadcast () {
                let BroadcastSlide, slideBoxs, clonedNode, slideHeight, hitListIndex
                if (this.$el && this.$el.children[0] && this.$el.children[0].children[0] && this.$el.children[0].children[0].children && this.$el.children[0].children[0].children[0]) {
                    let $elChild0 = this.$el.children[0]
                    BroadcastSlide = $elChild0.children[0]
                    slideBoxs = $elChild0.children[0].children
                    clonedNode = slideBoxs[0].cloneNode(true)
                    BroadcastSlide.appendChild(clonedNode)
                    hitListIndex = 0
                    if(this.isVerify){
                        // 异步coin
                        slideHeight = BroadcastSlide.querySelector('li').offsetHeight
                        slideBoxs = BroadcastSlide.querySelectorAll('ul')[0].querySelectorAll('li')
                    }else{
                        slideBoxs = $elChild0.children[0].children
                        slideHeight = $elChild0.offsetHeight
                    }
                    this.currLen = slideBoxs.length
                    let scrollFn = () => {
                        hitListIndex = hitListIndex + this.stepScroll
                        if (hitListIndex > slideBoxs.length - 1) {
                            hitListIndex = 0
                            BroadcastSlide.style.transition = 'all 0s'
                            BroadcastSlide.style.webkitTransition = 'all 0s'
                            BroadcastSlide.style.transform = 'translateY(0px)'
                        } else {
                            BroadcastSlide.style.transition = 'all 1.2s'
                            BroadcastSlide.style.webkitTransition = 'all 1.2s'
                        }
                        if (this.currLen !== $elChild0.children[0].children.length && !this.isVerify) {
                            hitListIndex = 0
                            BroadcastSlide.style.transition = 'all 0s'
                            BroadcastSlide.style.webkitTransition = 'all 0s'
                            BroadcastSlide.style.transform = 'translateY(0px)'
                            this.currLen = $elChild0.children[0].children.length
                        }
                        BroadcastSlide.style.transform = 'translateY(-' + hitListIndex * slideHeight + 'px)'
                        BroadcastSlide.style.webkitTransform = 'translateY(-' + hitListIndex * slideHeight + 'px)'
                    }
                    scrollFn()
                    clearInterval(this.scrollInterval)
                    this.scrollInterval = setInterval(scrollFn , this.scrollTime )
                } else {
                    return false
                }
            },
            arrayEqual(arr1, arr2 ){
                if(arr1 === arr2) return true;
                if(arr1.length !== arr2.length) return false;
                for(var i=0; i< arr1.length;++i){
                    if(arr1[i] !== arr2[i]) return false
                }
                return true
            },
        },
        props:{
            // 
            isVerify:{
                type:Boolean,
                default:()=>{
                    return false
                }
            },
            scrollTime:{
                type:Number,
                default:()=>{
                    return 3500
                }
            },
            stepScroll:{
                type:Number,
                default:()=>{
                    return 1
                }
            }
        },
        mounted () {
            setTimeout(() => {
                this.hitListBroadcast()
            }, 1000)
        },
        watch: {
            data(newData,oldData){
                console.log(oldData)
                console.log(oldData)
                console.log(newData)
                console.log(newData)
                if(!this.arrayEqual(newData,oldData)){
                    clearInterval( this.scrollInterval )
                    this.hitListBroadcast()
                }
            }
        },
        beforeDestroy(){
            clearInterval( this.scrollInterval )
        }
    }
</script>
