<template>
    <div class="game-main" ref="game" v-if="isLogin && show">
        <audio :src="musicSrc" class="poker-audio" ref="musicObj" loop="loop"></audio>
        <i class="music-btn" @click="switchMusic" ref="musicBtn"></i>
        <i class="close-btn" @click="closeGame" ref="closeBtn"></i>
        <i class="hammer-btn" :style="{transform: `translate(${hammerX}px,${hammerY}px)`}" v-if="!hideHammer"></i>
        <i
            class="ghost1-ct"
            :style="{transform: `translate(${ghost1.x}px,${ghost1.y}px) `}"
            @click="beatIt('1', 'ghost1')"
            :class="{beating: isBeating, isWin: ghost1.isWin, filp: !ghost1.direction}"
            ref="ghost1">
            <p class="prize">+1.0CC</p>
            <i class="star1"></i>
            <i class="star2"></i>
            <i class="star3"></i>
            <img src="@/assets/img/halloween/monster01.png" :style="{transform: `rotateY(${ghost1.direction ? '0deg' : '180deg'})`}" draggable="false" class="ghost1" v-if="ghost1.animate">
            <img src="@/assets/img/halloween/monster02.png" :style="{transform: `rotateY(${ghost1.direction ? '0deg' : '180deg'})`}" draggable="false" class="ghost1" v-else>
        </i>
        <i 
            class="ghost11-ct"
            :style="{transform: `translate(${ghost11.x}px,${ghost11.y}px) `}"
            @click="beatIt('1', 'ghost11')"
            :class="{beating: isBeating, isWin: ghost11.isWin, filp: !ghost11.direction}"
            ref="ghost11">
            <p class="prize">+1.0CC</p>
            <i class="star1"></i>
            <i class="star2"></i>
            <i class="star3"></i>
            <img src="@/assets/img/halloween/monster01.png" :style="{transform: `rotateY(${ghost11.direction ? '0deg' : '180deg'})`}" draggable="false" class="ghost1" v-if="ghost11.animate">
            <img src="@/assets/img/halloween/monster02.png" :style="{transform: `rotateY(${ghost11.direction ? '0deg' : '180deg'})`}" draggable="false" class="ghost1" v-else>
        </i>
        <i class="ghost2-ct" @click="beatIt('2', 'ghost2')" :class="{beating: isBeating, isWin: ghost2.isWin}" ref="ghost2">
            <p class="prize">+0.5CC</p>
            <i class="star1"></i>
            <i class="star2"></i>
            <i class="star3"></i>
            <img src="@/assets/img/halloween/monster11.png" draggable="false" class="ghost2" v-if="animateStatus <= 2">
            <img src="@/assets/img/halloween/monster12.png" draggable="false" class="ghost2" v-else>
        </i>
        <i class="ghost21-ct" @click="beatIt('2', 'ghost21')" :class="{beating: isBeating, isWin: ghost21.isWin}" ref="ghost21">
            <p class="prize">+0.5CC</p>
            <i class="star1"></i>
            <i class="star2"></i>
            <i class="star3"></i>
            <img src="@/assets/img/halloween/monster11.png" draggable="false" class="ghost2" v-if="animateStatus >= 2">
            <img src="@/assets/img/halloween/monster12.png" draggable="false" class="ghost2" v-else>
        </i>
        <i class="ghost3-ct" @click="beatIt('3', 'ghost3')" :class="{beating: isBeating, isWin: ghost3.isWin}" :style="{bottom: `${ghost3.bottom}px`}" ref="ghost3">
            <p class="prize">+1.5CC</p>
            <i class="star1"></i>
            <i class="star2"></i>
            <i class="star3"></i>
            <img src="@/assets/img/halloween/monster21.png" draggable="false" class="ghost3" v-if="animateStatus === 1">
            <img src="@/assets/img/halloween/monster22.png" draggable="false" class="ghost3" v-else-if="animateStatus === 2">
            <img src="@/assets/img/halloween/monster23.png" draggable="false" class="ghost3" v-else-if="animateStatus === 3">
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
            default: false
        },
        scene: String
    },
    data () {
        return {
            loadMusic: null,
            musicSrc: '',
            isPause: false,
            ghosts: [],
            ghost1: { x: -169, y: 0, direction: true, speed: 0.01, animate: false, isWin: false },
            ghost11: { x: window.document.body.clientWidth, y: 0, direction: false, speed: 0.01, animate: false, isWin: false },
            ghost2: { isWin: false },
            ghost21: { isWin: false },
            ghost3: { isWin: false, bottom: 0 },
            currentData: null,
            gameWidth: null,
            gameHeight: null,
            hammerX: -10000,
            hammerY: -10000,
            isBeating: false,
            hideHammer: true,
            timer: null,
            animateStatus: 1
        }
    },
    methods: {
        playMusic () {
            this.loadMusic.then(() => {
                let musicObj = this.$refs.musicObj
                musicObj.currentTime = 0
                this.$refs.musicObj.volume = 0.5
                musicObj.play && musicObj.play()
            })
        },
        switchMusic () {
            this.loadMusic.then(() => {
                let musicObj = this.$refs.musicObj
                if (!this.isPause) {
                    musicObj.pause && musicObj.pause()
                } else {
                    musicObj.play && musicObj.play()
                }
                this.isPause = !this.isPause
            })
        },
        startAnimate () {
            this.animateTimer = setTimeout(this.startAnimate.bind(this), 1000 / 60)
            this.renderNextFrame()
        },
        moveGhost1 (ghost) {
            if (ghost.direction) {
                if (ghost.x >= (this.gameWidth + 200)) {
                    ghost.direction = false
                    return
                }
                ghost.x += 1.4
            } else {
                if (ghost.x <= -200) {
                    ghost.direction = true
                    return
                }
                ghost.x -= 1.4
            }
            let num = Number(Math.cos(ghost.speed).toFixed(4))
            ghost.y = num * 50
            ghost.animate = (num > 0)
            ghost.speed += 0.05
        },
        renderNextFrame () {
            this.moveGhost1(this.ghost1)
            this.moveGhost1(this.ghost11)
        },
        startGame () {
            this.startAnimate()
            this.timer = setInterval(() => {
                this.animateStatus += 1
                if (this.animateStatus === 5) {
                    this.animateStatus = 1
                }
            }, 1000)
        },
        beatIt (ghostType, ghostRefName) {
            if (!this.isBeating) {
                setTimeout(() => {
                    this.isBeating = false
                }, 100)
                this.isBeating = true
                this[ghostRefName].isWin = true
                setTimeout(() => {
                    this[ghostRefName].isWin = false
                }, 2000)
            }
        },
        onScroll () {
            let footerTop
            if (this.scene === 'lucky11') {
                footerTop = document.getElementsByClassName('pre-numberBox')[0] && getElementAbsolutePosition(document.getElementsByClassName('pre-numberBox')[0]).top
            } else {
                footerTop = document.getElementsByClassName('footer')[0] && getElementAbsolutePosition(document.getElementsByClassName('footer')[0]).top
            }
            if (footerTop) {
                let dis = window.scrollY + window.innerHeight
                if (dis > footerTop) {
                    this.ghost3.bottom = dis - footerTop
                } else {
                    this.ghost3.bottom = 0
                }
            }
        },
        getGhosts () {
            this.$store.dispatch('cs_halloween/getGhosts')
                .then(res => {
                    this.nextRefreshTime = res.data.last_time
                    this.currentData = res.data
                })
        },
        clearGhostStatus () {
            this.ghost1 = { x: -169, y: 0, direction: true, speed: 0.01, animate: false, isWin: false }
            this.ghost11 = { x: window.document.body.clientWidth, y: 0, direction: false, speed: 0.01, animate: false, isWin: false }
            this.ghost2 = { isWin: false }
            this.ghost22 = { isWin: false }
            this.ghost3 = { isWin: false, bottom: 0 }
        },
        closeGame () {
            clearInterval(this.timer)
            clearTimeout(this.animateTimer)
            this.clearGhostStatus()
            this.$emit('update:show', false)
        }
    },
    mounted () {
        this.isLogin && this.getGhosts()
        this.$nextTick(() => {
            this.gameWidth = window.document.body.clientWidth
            this.gameHeight = window.document.body.clientHeight
            this.loadMusic = bgMusic().then(res => {
                this.musicSrc = res
                return res
            })
        })

        window.addEventListener('scroll', this.onScroll)
        setTimeout(() => {
            this.onScroll()
        }, 400)
    },
    computed: {
        isLogin () {
            return this.$store.state.isLog
        }
    },
    watch: {
        isLogin (value) {
            value && this.getGhosts()
        },
        show (value) {
            value && this.playMusic()
            value && this.startGame()
        }
    },
    destroyed () {
        this.closeGame()
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
    .isWin .prize {
        display: block;
        animation: moneyMove 0.8s forwards ease-in;
        animation-delay: 0.2s;
    }
    .star1, .star2, .star3 {
        display: none;
    }
    .isWin {
        .star1, .star2, .star3 {
            display: block;
            position: absolute;
            width: 26px;
            height: 26px;
            background: url(../../assets/img/halloween/star.png) no-repeat;
            background-size: 100% 100%;
            animation: starFade 0.8s forwards ease-in;
        }
    }
    .ghost1-ct, .ghost11-ct {
        &.isWin {
            .star1 {
                right: 39px;
                top: 69px;
                width: 33px !important;
            }
            .star2 {
                left: 63px;
                bottom: 85px;
                transform: rotate(30deg)
            }
            .star3 {
                bottom: 61px;
                right: 71px;
            }
        }
        &.filp.isWin {
            .star1 {
                left: 39px;
                top: 69px;
                width: 33px !important;
            }
            .star2 {
                left: 63px;
                bottom: 65px;
                transform: rotate(30deg)
            }
            .star3 {
                bottom: 91px;
                right: 71px;
            }
        }
    }
    .ghost2-ct, .ghost21-ct {
        &.isWin {
            .star1 {
                right: 39px;
                top: 39px;
                width: 33px !important;
            }
            .star2 {
                left: 25px;
                bottom: 85px;
                transform: rotate(30deg)
            }
            .star3 {
                bottom: 31px;
                right: 51px;
            }
        }
    }

    .ghost3-ct{
        &.isWin {
            .star1 {
                right: 0;
                top: 0;
                width: 33px !important;
            }
            .star2 {
                left: -40px;
                bottom: 100px;
                transform: rotate(30deg)
            }
            .star3 {
                bottom: 0;
                right: 0;
            }
        }
    }
    .prize {
        text-align: center;
        font-size: 36px;
        color: #efb811;
        font-family: sans-eb;
        display: none;
    }
    .music-btn {
        position: fixed;
        top: 100px;
        right: 100px;
        width: 23px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAWlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////9ZMre9AAAAHXRSTlMAHfcFfGGv6dvWkYczKSIR4bihb1ZPQDkN686pR8NwSlAAAACQSURBVBjTfdFZEoMwDANQ4bATSNm76f7XLNCQpGGm+nzjD1vGmXt+U4jSVWQS2VrwgpPwiyrVp6WkxY5MD1IDHSIjx22qLOhRbSoJSHpsZUbOJkIWSvP5i+i5QiTCgcsFVSlGs4KEOLLBizWyvvRopn3R9ugnWH4WexIah4mwhk3mCqnfcFkeO/4r2ccE7/gAJV0Tm68GtGMAAAAASUVORK5CYII=) no-repeat;
        height: 20px;
        cursor: pointer !important;
    }
    .close-btn {
        position: fixed;
        top: 100px;
        right: 50px;
        width: 23px;
        background: url(../../assets/img/halloween/close.png);
        height: 23px;
        cursor: pointer !important;
        background-size: 100% 100%;
    }
    .ghost1-ct, .ghost11-ct, .ghost2-ct, .ghost21-ct, .ghost3-ct {
        position: relative;
        cursor: url(../../assets/img/halloween/01.png), auto;
        &.beating  {
            cursor: url(../../assets/img/halloween/02.png), auto;
        }
    }
    .ghost1-ct {
        position: fixed;
        top: 90px;
        left: 0%;
        padding: 50px;
    }

    .ghost11-ct {
        position: fixed;
        top: 300px;
        left: 0%;
        padding: 50px;
    }

    .ghost2-ct {
        position: fixed;
        top: -140px;
        left: 100px;
        padding: 50px;
        animation: ghost2Down 10s infinite ease-in-out;
        animation-delay: 3s;
    }

    .ghost21-ct {
        position: fixed;
        top: 0;
        right: 100px;
        padding: 50px;
        animation: ghost2Down 10s infinite ease-in-out;
    }

    .ghost3-ct {
        position: fixed;
        bottom: 0;
        left: 0%;
        animation: ghost3Walk 30s infinite linear;
    }

    .demo {
        position: fixed;
        bottom: 100px;
        left: 0%;
        animation: demoFly 30s infinite linear;
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

    @keyframes moneyMove {
        from {
            opacity: 1;
            transform: translate(0, 0)
        }
        to {
            opacity: 0;
            transform: translate(0, -100px)
        }
    }

    @keyframes starFade {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }

    @keyframes ghost3Walk {
        0% {
            transform: translate(-200px, 0);
            img {
                transform: rotateY(0deg);
            }
        }
        50% {
            transform: translate(2000px, 0);
        }
        51%{
            transform: translate(2000px, 0);
            img {
                transform: rotateY(180deg);
            }
        }
        100% {
            transform: translate(-200px, 0);
            img {
                transform: rotateY(180deg);
            }
        }
    }
}
</style>