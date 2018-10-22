<template>
    <div class="main" :style="{ visibility: this.show ? 'visible': 'hidden' }" ref="game" @mousemove="mousemove" @click="beatGhost">
        <audio :src="musicSrc" class="poker-audio" ref="musicObj"></audio>
        <i v-for="item in ghosts" :key="item.monster_id" class="ghost" :style="{transform: `translate(${item.x}px,${item.y}px)`}">
            <img draggable="false" src="@/assets/img/helloween/ghost-dead.png" v-if="isDead">
            <img draggable="false" @click="hitIt" src="@/assets/img/helloween/ghost.png" v-else>
        </i>
        <i class="music-btn" @click="switchMusic" ref="musicBtn"></i>
        <i class="close-btn" @click="closeGame" ref="closeBtn">X</i>
        <i class="hammer-btn" :style="{transform: `translate(${hammerX}px,${hammerY}px)`}" v-if="!hideHammer">
            <img src="@/assets/img/helloween/hammer.ico" draggable="false" :class="{beat: isWaitingLastBeat}">
        </i>
        
    </div>
</template>

<script>
const bgMusic = () => import('~static/audio/helloween/helloween.mp3')
export default {
    props: {
        show: {
            type: Boolean,
            default: true
        },
        scene: String
    },
    watch: {
        show (value) {
            value ? this.playMusic() : this.closeGame()
            this.isPause = false
        }
    },
    data () {
        return {
            isDead: false,
            loadMusic: null,
            musicSrc: '',
            isPause: false,
            ghosts: [],
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
        hitIt () {
            this.isDead = true
        },
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
            this.ghosts.forEach(ghost => {
                ghost.monster_type === '0' && this.move1(ghost)
                ghost.monster_type === '1' && this.move2(ghost)
                ghost.monster_type === '2' && this.move2(ghost)
            })
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
            if (event.target === this.$refs.musicBtn || event.target === this.$refs.closeBtn) {
                console.log(1)
                this.hideHammer = true
            } else {
                this.hammerX = event.layerX
                this.hammerY = event.layerY
                this.hideHammer = false
            }
        },
        beatGhost () {
            if (!this.isWaitingLastBeat) {
                setTimeout(() => {
                    this.isWaitingLastBeat = false
                }, 200)
                this.isWaitingLastBeat = true
            }
        }
    },
    mounted () {
        this.loadMusic = bgMusic().then(res => {
            this.musicSrc = res
            this.$refs.musicObj.volume = 0.5
            return res
        })
        this.$store.dispatch('cs_helloween/getGhosts')
            .then(res => {
                this.nextRefreshTime = res.data.last_time
                this.ghosts = this.initGhosts(res.data[this.scene])
                this.currentData = res.data
            })
        this.$nextTick(() => {
            this.gameWidth = this.$refs.game.clientWidth - 30
            this.gameHeight = this.$refs.game.clientHeight - 30
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
    background-color: #FFF;
    background: url(../../assets/img/helloween/bg.jpg);
    width: 698px;
    height: 500px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-size: 100% 100%;
    &:hover {
        cursor: none;
    }
    *:hover {
        cursor: none;
    }
    .ghost {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 30px;
    }
    .music-btn {
        position: absolute;
        top: 10px;
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
    .close-btn {
        color: #FFF;
        font-size: 20px;
        position: absolute;
        cursor: pointer !important;
        top: 10px;
        right: 30px;
    }
    @keyframes beatIt {
        from {
            transform: rotate(0deg)
        }
        to {
            transform: rotate(-50deg)
        }
    }
}
</style>