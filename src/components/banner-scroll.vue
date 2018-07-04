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
                currLen: null
            }
        },
        methods: {
            hitListBroadcast () {
                let BroadcastSlide, slideBoxs, clonedNode, slideHeight, hitListIndex
                if (this.$el && this.$el.children[0] && this.$el.children[0].children[0] && this.$el.children[0].children[0].children) {
                    let $elChild0 = this.$el.children[0]
                    BroadcastSlide = $elChild0.children[0]
                    slideBoxs = $elChild0.children[0].children
                    slideHeight = $elChild0.offsetHeight //   4px 的border
                    hitListIndex = 0
                    clonedNode = slideBoxs[0].cloneNode(true)
                    BroadcastSlide.appendChild(clonedNode)
                    this.currLen = slideBoxs.length
                    setInterval(() => {
                        hitListIndex++
                        if (this.currLen !== $elChild0.children[0].children.length) {
                            hitListIndex = 0
                            this.currLen = $elChild0.children[0].children.length
                        }
                        if (hitListIndex > slideBoxs.length - 1) {
                            hitListIndex = 0
                            BroadcastSlide.style.transition = 'all 0s'
                            BroadcastSlide.style.webkitTransition = 'all 0s'
                            BroadcastSlide.style.transform = 'translateY(0px)'
                        } else {
                            BroadcastSlide.style.transition = 'all 1.2s'
                            BroadcastSlide.style.webkitTransition = 'all 1.2s'
                        }
                        BroadcastSlide.style.transform = 'translateY(-' + hitListIndex * slideHeight + 'px)'
                        BroadcastSlide.style.webkitTransform = 'translateY(-' + hitListIndex * slideHeight + 'px)'
                    }, 3000)
                } else {
                    return false
                }
            }
        },
        mounted () {
            setTimeout(() => {
                this.hitListBroadcast()
            }, 800)
        }
    }
</script>
