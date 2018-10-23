<template>
    <div class="main" ref="game" >
        <audio :src="musicSrc" class="poker-audio" ref="musicObj"></audio>
        <!-- <i v-for="item in ghosts" :key="item.monster_id" class="ghost" :class="{beating: !!item.beating}" >
            <img draggable="false" src="@/assets/img/halloween/ghost-dead.png" v-if="isDead">
            <img draggable="false" src="@/assets/img/halloween/ghost.png">
        </i> -->
        <i class="music-btn" @click="switchMusic" ref="musicBtn"></i>
        <i class="hammer-btn" :style="{transform: `translate(${hammerX}px,${hammerY}px)`}" v-if="!hideHammer">
            
        </i>
        <i class="ghost-ct" :style="{transform: `translate(${ghost.x}px,${ghost.y}px) rotateY(${ghost.direction ? '0deg' : '180deg'})`}" @click="beatIt" :class="{beating: ghost.beating}">
            <img src="@/assets/img/halloween/ghost1.png" draggable="false" class="ghost1" >
        </i>
    </div>
</template>

<script>
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
            ghost: { x: 0, y: 0, direction: true, speed: 0.01 },
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
        move1 (ghost) {
            let offsetX = 1
            let offsetY = 0.3
            if (ghost.x + offsetX > this.gameWidth) {
                ghost.directionX = false
            }
            if (ghost.x - offsetX < 0) {
                ghost.directionX = true
            }
            if (ghost.y + offsetY > this.gameHeight) {
                ghost.directionY = false
            }
            if (ghost.y - offsetY < 0) {
                ghost.directionY = true
            }
            ghost.x = ghost.directionX ? ghost.x + offsetX : ghost.x - offsetX
            ghost.y = ghost.directionY ? ghost.y + offsetY : ghost.y - offsetY
        },
        move2 (ghost) {
            let offsetX = 0.3
            let offsetY = 1
            if (ghost.x + offsetX > this.gameWidth) {
                ghost.directionX = false
            }
            if (ghost.x - offsetX < 0) {
                ghost.directionX = true
            }
            if (ghost.y + offsetY > this.gameHeight) {
                ghost.directionY = false
            }
            if (ghost.y - offsetY < 0) {
                ghost.directionY = true
            }
            ghost.x = ghost.directionX ? ghost.x + offsetX : ghost.x - offsetX
            ghost.y = ghost.directionY ? ghost.y + offsetY : ghost.y - offsetY
        },
        move3 () {

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
            this.ghost.y = Number(Math.cos(this.ghost.speed).toFixed(4)) * 50
            this.ghost.speed += 0.01
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
        },
        mousemove () {
            console.log(event)
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
    },
    destroyed () {
        this.closeGame()
    }
}
</script>


<style lang="less" scoped>
.main {
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
    .hammer-btn {
        position: absolute;
        transform: translate(0px, 0px);
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        /* -webkit-user-select: none; */
        -webkit-appearance: none;
        img.beat {
            animation: beatIt .2s ease-in-out;
        }
    }
    .ghost-ct {
        position: fixed;
        top: 90px;
        left: 0%;
        padding: 50px;
        &:hover {
            cursor: url(../../assets/img/halloween/1.png), auto;
        }
        &.beating :hover {
            cursor: url(../../assets/img/halloween/2.png), auto;
        }
    }
    .ghost1 {
        width: 100px;
        // animation: ghost1Fly 40s infinite ease-in-out;
    }

    @keyframes beatIt {
        from {
            transform: rotate(0deg)
        }
        to {
            transform: rotate(-50deg)
        }
    }

    @keyframes ghost1Fly {
        0% {
            transform: translate(-200px, 0) rotateY(0deg);
        }
        20%, 40% {
            transform: translate(0, 0) rotateY(0deg);
        }
        10%, 30% {
            transform: translate(0, 50px) rotateY(0deg);
        }
        50% {
            left: 100%;
            transform: translate(200px, 50px) rotateY(0deg);
        }
        51%, 70%, 90% {
            transform: translate(0, 0) rotateY(180deg);
        }
        60%, 80% {
            transform: translate(0, 50px) rotateY(180deg);
        }
        100% {
            left: 0%;
            transform: translate(-200px, 0) rotateY(180deg);
        }
    }
}
</style>