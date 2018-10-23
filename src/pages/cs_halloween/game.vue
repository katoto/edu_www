<template>
    <div class="game-main" ref="game" >
        <audio :src="musicSrc" class="poker-audio" ref="musicObj"></audio>
        <i class="music-btn" @click="switchMusic" ref="musicBtn"></i>
        <i class="hammer-btn" :style="{transform: `translate(${hammerX}px,${hammerY}px)`}" v-if="!hideHammer">
            
        </i>
        <i class="ghost1-ct" :style="{transform: `translate(${ghost.x}px,${ghost.y}px) rotateY(${ghost.direction ? '0deg' : '180deg'})`}" @click="beatIt" :class="{beating: ghost.beating}">
            <img src="@/assets/img/halloween/monster01.png" draggable="false" class="ghost1" v-if="ghost.animate">
            <img src="@/assets/img/halloween/monster02.png" draggable="false" class="ghost1" v-else>
        </i>
        <i class="ghost2-ct" @click="beatIt" :class="{beating: ghost.beating}">
            <img src="@/assets/img/halloween/monster11.png" draggable="false" class="ghost2" v-if="ghost2.animate">
            <img src="@/assets/img/halloween/monster12.png" draggable="false" class="ghost2" v-else>
        </i>
        <i class="ghost3-ct" @click="beatIt" :class="{beating: ghost.beating}" :style="{bottom: `${ghost3.bottom}px`}">
            <img src="@/assets/img/halloween/monster21.png" draggable="false" class="ghost3" v-if="ghost3.animate === 1">
            <img src="@/assets/img/halloween/monster22.png" draggable="false" class="ghost3" v-else-if="ghost3.animate === 2">
            <img src="@/assets/img/halloween/monster23.png" draggable="false" class="ghost3" v-else-if="ghost3.animate === 3">
            <img src="@/assets/img/halloween/monster24.png" draggable="false" class="ghost3" v-else>
        </i>
    </div>
</template>

<script>
import { getElementAbsolutePosition } from '~common/util'
const bgMusic = () => import('~static/audio/halloween/halloween.mp3')
export default {
    props: {
        show: {
            type: Boolean,
            default: true
        },
        scene: String
    },
    data () {
        return {
            loadMusic: null,
            musicSrc: '',
            isPause: false,
            ghosts: [],
            ghost: { x: 0, y: 0, direction: true, speed: 0.01, animate: false },
            ghost2: { },
            ghost3: { animate: 1, bottom: 0 },
            currentData: null,
            gameWidth: null,
            gameHeight: null,
            hammerX: -10000,
            hammerY: -10000,
            isWaitingLastBeat: false,
            hideHammer: true
        }
    },
    methods: {
        playMusic () {
            this.loadMusic.then(() => {
                let musicObj = this.$refs.musicObj
                musicObj.currentTime = 0
                musicObj.play && musicObj.play()
            })
        },
        switchMusic () {
            this.loadMusic.then(() => {
                let musicObj = this.$refs.musicObj
                musicObj.currentTime = 0
                if (!this.isPause) {
                    musicObj.pause && musicObj.pause()
                } else {
                    musicObj.play && musicObj.play()
                }
                this.isPause = !this.isPause
            })
        },
        closeGame () {
            let musicObj = this.$refs.musicObj
            musicObj.currentTime = 0
            musicObj.pause && musicObj.pause()
            this.isPause = false
            this.$emit('update:show', false)
            this.closeAnimate()
        },
        startAnimate () {
            let requestAnimFrame = (function () {
                let vm = this
                return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    function (callback) {
                        window.setTimeout.call(vm, callback, 1000 / 60)
                    }
            })()
            requestAnimFrame(this.startAnimate)
            this.renderNextFrame()
        },
        renderNextFrame () {
            if (this.ghost.direction) {
                if (this.ghost.x >= (this.gameWidth + 200)) {
                    this.ghost.direction = false
                    return
                }
                this.ghost.x += 1.4
            } else {
                if (this.ghost.x <= -200) {
                    this.ghost.direction = true
                    return
                }
                this.ghost.x -= 1.4
            }
            let num = Number(Math.cos(this.ghost.speed).toFixed(4))
            this.ghost.y = num * 50
            this.ghost.animate = (num > 0)
            this.ghost2.animate = (num > 0)
            this.ghosts.last = (num > 0)
            this.ghost.speed += 0.05
        },
        initGhosts (ghosts) {
            ghosts.forEach(ghost => {
                ghost.x = Math.floor(Math.random() * this.gameWidth)
                ghost.y = Math.floor(Math.random() * this.gameHeight)
                ghost.directionX = Math.random > 0.5
                ghost.directionY = Math.random > 0.5
            })
            return ghosts
        },

        startGame () {
            this.startAnimate()
            this.timer = setInterval(() => {
                this.ghost3.animate += 1
                if (this.ghost3.animate === 5) {
                    this.ghost3.animate = 1
                }
            }, 1000)
        },
        mousemove () {
            this.hammerX = event.offsetX
            this.hammerY = event.offsetY
        },
        beatGhost () {
            if (event.target === this.$refs.musicBtn || event.target === this.$refs.closeBtn) {
                return
            }
            if (!this.isWaitingLastBeat) {
                setTimeout(() => {
                    this.isWaitingLastBeat = false
                }, 200)
                this.isWaitingLastBeat = true

                let ghost = this.getBeatGhost(event.layerX, event.layerY)
                ghost.beating = true
                setTimeout(() => {
                    ghost.beating = false
                }, 200)
            }
        },
        getBeatGhost (x, y) {
            let thisGhost
            let distance = 0
            this.ghosts.forEach(ghost => {
                let thisDis = Math.pow(Math.floor(ghost.x) - Math.floor(x), 2) + Math.pow(Math.floor(ghost.y) - Math.floor(y), 2)
                if (distance > thisDis || distance === 0) {
                    thisGhost = ghost
                    distance = thisDis
                }
            })
            return distance > 1500 ? thisGhost : null
        },
        beatIt () {
            if (!this.isWaitingLastBeat) {
                setTimeout(() => {
                    this.isWaitingLastBeat = false
                }, 200)
                this.isWaitingLastBeat = true
                this.ghost.beating = true
                setTimeout(() => {
                    this.ghost.beating = false
                }, 1000)
            }
        },
        onScroll () {
            let footerTop
            if (this.scene === 'lucky11') {
                footerTop = getElementAbsolutePosition(document.getElementsByClassName('pre-numberBox')[0]).top
            } else {
                footerTop = getElementAbsolutePosition(document.getElementsByClassName('footer')[0]).top
            }
            if (footerTop) {
                let dis = window.scrollY + window.innerHeight
                console.log(dis, footerTop, this.ghost3.bottom)
                if (dis > footerTop) {
                    this.ghost3.bottom = dis - footerTop
                } else {
                    this.ghost3.bottom = 0
                }
            }
        }
    },
    mounted () {
        this.loadMusic = bgMusic().then(res => {
            this.musicSrc = res
            this.$refs.musicObj.volume = 0.5
            return res
        })
        this.$store.dispatch('cs_halloween/getGhosts')
            .then(res => {
                this.nextRefreshTime = res.data.last_time
                this.ghosts = this.initGhosts(res.data[this.scene])
                this.currentData = res.data
                this.playMusic()
            })
        this.$nextTick(() => {
            this.gameWidth = window.document.body.clientWidth
            this.gameHeight = window.document.body.clientHeight
            this.startGame()
        })

        window.addEventListener('scroll', this.onScroll)
        setTimeout(() => {
            this.onScroll()
        }, 400)
    },
    destroyed () {
        this.closeGame()
        clearInterval(this.timer)
    }
}
</script>


<style lang="less" scoped>
.game-main {
    *{
        moz-user-select: -moz-none;
        -moz-user-select: none;
        -o-user-select:none;
        -khtml-user-select:none;
        -webkit-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }
    position: fixed;
    z-index: 100000000000000;
    top: 70px;
    left: 0;
    .music-btn {
        position: absolute;
        top: 80px;
        right: 70px;
        width: 23px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAWlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////9ZMre9AAAAHXRSTlMAHfcFfGGv6dvWkYczKSIR4bihb1ZPQDkN686pR8NwSlAAAACQSURBVBjTfdFZEoMwDANQ4bATSNm76f7XLNCQpGGm+nzjD1vGmXt+U4jSVWQS2VrwgpPwiyrVp6WkxY5MD1IDHSIjx22qLOhRbSoJSHpsZUbOJkIWSvP5i+i5QiTCgcsFVSlGs4KEOLLBizWyvvRopn3R9ugnWH4WexIah4mwhk3mCqnfcFkeO/4r2ccE7/gAJV0Tm68GtGMAAAAASUVORK5CYII=) no-repeat;
        height: 20px;
        cursor: pointer !important;
    }
    .ghost1-ct, .ghost2-ct, .ghost3-ct {
        cursor: url(../../assets/img/halloween/1.png), auto;
        &.beating  {
            cursor: url(../../assets/img/halloween/2.png), auto;
        }
    }
    .ghost1-ct {
        position: fixed;
        top: 90px;
        left: 0%;
        padding: 50px;
    }

    .ghost1-ct {
        position: fixed;
        top: 90px;
        left: 0%;
        padding: 50px;
    }

    .ghost2-ct {
        position: fixed;
        top: 0;
        left: 100px;
        padding: 50px;
        animation: ghost2Down 10s infinite ease-in-out;
    }

    .ghost3-ct {
        position: fixed;
        bottom: 0;
        left: 0%;
        animation: ghost3Walk 30s infinite linear;
    }

    .ghost1, .ghost2, .ghost3 {
        width: 100px;
        // animation: ghost1Fly 40s infinite ease-in-out;
    }

    @keyframes ghost2Down {
        0%, 100% {
            transform: translate(0, -200px);
        }
        20%, 40%, 60%, 80% {
            transform: translate(0, 150px);
        }
        10%, 30%, 50%, 70%, 90% {
            transform: translate(0, 200px);
        }
    }

    @keyframes ghost3Walk {
        0% {
            transform: translate(-200px, 0) rotateY(0deg);
        }
        50% {
            transform: translate(2000px, 0);
        }
        51%{
            transform: translate(2000px, 0) rotateY(180deg);
        }
        100% {
            transform: translate(-200px, 0) rotateY(180deg);
        }
    }
}
</style>