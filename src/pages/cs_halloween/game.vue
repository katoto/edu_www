<template>
    <div class="game-main" ref="game" v-if="isLogin && show">
        <audio
            :src="musicSrc"
            class="poker-audio"
            ref="musicObj"
            loop="loop">
        </audio>
        <i
            class="music-btn"
            @click="switchMusic"
            ref="musicBtn">
        </i>
        <i
            class="close-btn"
            @click="closeGame"
            ref="closeBtn">
        </i>
        <i
            class="hammer-btn"
            :style="{transform: `translate(${hammerX}px,${hammerY}px)`}"
            v-if="!hideHammer">
        </i>
        <i
            class="ghost1-ct"
            :style="{transform: `translate(${ghost1.x}px,${ghost1.y}px) `}"
            @click="beatIt('ghost', 'ghost1')"
            :class="{beating: isBeating, isWin: ghost1.isWin, filp: !ghost1.direction}"
            ref="ghost1"
            v-if="witchs.length > 0">
            <p class="prize">+1.0CC</p>
            <i class="star1"></i>
            <i class="star2"></i>
            <i class="star3"></i>
            <img
                src="@/assets/img/halloween/monster01.png"
                :style="{transform: `rotateY(${ghost1.direction ? '0deg' : '180deg'})`}"
                draggable="false"
                class="ghost1"
                v-if="ghost1.animate">
            <img
                src="@/assets/img/halloween/monster02.png"
                :style="{transform: `rotateY(${ghost1.direction ? '0deg' : '180deg'})`}"
                draggable="false"
                class="ghost1"
                v-else>
        </i>
        <i 
            class="ghost11-ct"
            :style="{transform: `translate(${ghost11.x}px,${ghost11.y}px) `}"
            @click="beatIt('ghost', 'ghost11')"
            :class="{beating: isBeating, isWin: ghost11.isWin, filp: !ghost11.direction}"
            ref="ghost11"
            v-if="witchs.length >= 2">
            <p class="prize">+1.0CC</p>
            <i class="star1"></i>
            <i class="star2"></i>
            <i class="star3"></i>
            <img
                src="@/assets/img/halloween/monster01.png"
                :style="{transform: `rotateY(${ghost11.direction ? '0deg' : '180deg'})`}"
                draggable="false"
                class="ghost1"
                v-if="ghost11.animate">
            <img
                src="@/assets/img/halloween/monster02.png"
                :style="{transform: `rotateY(${ghost11.direction ? '0deg' : '180deg'})`}"
                draggable="false"
                class="ghost1"
                v-else>
        </i>
        <i
            class="ghost2-ct"
            @click="beatIt('jackolantern', 'ghost2')"
            :class="{beating: isBeating, isWin: ghost2.isWin}"
            ref="ghost2"
            v-if="spiders.length > 0">
            <p class="prize">+0.5CC</p>
            <i class="star1"></i>
            <i class="star2"></i>
            <i class="star3"></i>
            <img src="@/assets/img/halloween/monster11.png" draggable="false" class="ghost2" v-if="animateStatus <= 2">
            <img src="@/assets/img/halloween/monster12.png" draggable="false" class="ghost2" v-else>
        </i>
        <i
            class="ghost21-ct"
            @click="beatIt('jackolantern', 'ghost21')"
            :class="{beating: isBeating, isWin: ghost21.isWin}"
            ref="ghost21"
            v-if="spiders.length >= 2">
            <p class="prize">+0.5CC</p>
            <i class="star1"></i>
            <i class="star2"></i>
            <i class="star3"></i>
            <img src="@/assets/img/halloween/monster11.png" draggable="false" class="ghost2" v-if="animateStatus >= 2">
            <img src="@/assets/img/halloween/monster12.png" draggable="false" class="ghost2" v-else>
        </i>
        <i
            class="ghost3-ct"
            @click="beatIt('demon', 'ghost3')"
            :class="{beating: isBeating, isWin: ghost3.isWin}"
            :style="{bottom: `${ghost3.bottom}px`}"
            ref="ghost3"
            v-if="skulls.length > 0">
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
import { Notification } from 'element-ui'
const bgMusic = () => import('~static/audio/halloween/halloween.mp3')
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            loadMusic: null,
            musicSrc: '',
            isPause: false,
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
            isAjax: false,
            hideHammer: true,
            timer: null,
            nextTimer: null,
            animateTimer: null,
            animateStatus: 1,
            jumpToOtherScene: false
        }
    },
    methods: {
        isCCAccount () {
            return this.currBalance.cointype === '2000'
        },
        changeToCCAccount () {
            let accounts = this.$store.state.userInfo.accounts
            let CCAccount = accounts.filter(
                account => account.cointype === '2000'
            )
            if (CCAccount && CCAccount[0]) {
                this.$store.commit('setCurrBalance', CCAccount[0])
            }
        },
        updateCC (money) {
            let updateMoney = Number(money).toFixed(4)
            if (this.isCCAccount() && !isNaN(Number(updateMoney))) {
                let data = {...this.currBalance, balance: updateMoney}
                this.$store.commit('setCurrBalance', data)
            }
            let userInfo = JSON.parse(JSON.stringify(this.$store.state.userInfo))
            userInfo.accounts.forEach((account, index) => {
                if (account.cointype === '2000') {
                    userInfo.accounts[index].balance = updateMoney
                }
            })
            this.$store.commit('setUserInfo', userInfo)
        },
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
            if (this.animateTimer) {
                this.animateTimer = null
                clearTimeout(this.animateTimer)
            }
            this.startAnimate()
            this.timer = setInterval(() => {
                this.animateStatus += 1
                if (this.animateStatus === 5) {
                    this.animateStatus = 1
                }
            }, 1000)
        },
        getGhostsByGhostType (ghostType) {
            return {
                demon: this.skulls,
                ghost: this.witchs,
                jackolantern: this.spiders
            }[ghostType] || []
        },
        selectRandomMonster (ghostType) {
            let arr = this.getGhostsByGhostType(ghostType)
            let randomIndex = Math.floor(Math.random() * arr.length)
            return arr[randomIndex]
        },
        isNoGhost () {
            return this.currentData[this.scene].length === 0
        },
        isAllNoGhost () {
            let currentData = this.currentData

            if (currentData) {
                return currentData.lucky11.length === 0 && currentData.luckycoin.length === 0 && currentData.poker.length === 0 && currentData.slot.length === 0
            }
            return true
        },
        removeMonster (ghostType, monsterId) {
            this.currentData[this.scene] = this.currentData[this.scene].filter(ghost => ghost.monster_id !== monsterId)
        },
        beatAjax (data) {
            return this.$store.dispatch('cs_halloween/beatGhost', data)
        },
        onSecondRunOnce (callback) {
            if (this.isAjax === false) {
                this.isAjax = true
                callback.call(this)

                // 1秒后解锁发起请求，保证1秒钟只能打怪一次
                setTimeout(() => {
                    this.isAjax = false
                }, 1000)
            }
        },
        beatIt (ghostType, ghostRefName) {
            // demon 1.5, ghost 1.0 jackolantern 0.5
            if (!this.isBeating) {
                setTimeout(() => {
                    this.isBeating = false
                }, 100)
                this.isBeating = true
            }
            this.onSecondRunOnce(() => {
                let randomMonster = this.selectRandomMonster(ghostType)
                this.beatAjax({
                    monster_id: randomMonster.monster_id,
                    monster_type: ghostType,
                    last_time: this.nextRefreshTime,
                    scene: this.scene
                }).then(res => {
                    this[ghostRefName].isWin = true
                    setTimeout(() => {
                        this[ghostRefName].isWin = false
                    }, 2000)
                    this.updateCC(res.data.total)
                    if (Number(res.data.remain) === 0) {
                        // 怪物被自己打死
                        this.removeMonster(ghostType, randomMonster.monster_id)
                        if (this.isAllNoGhost()) {
                            this.message('妖怪已被消灭完，请稍后再来')
                            return
                        }
                        if (this.isNoGhost()) {
                            this.goToOtherScene()
                        }
                    }
                }).catch(err => {
                    if (err.status === '470') {
                        // 怪物被别人打死，如果骷髅怪数量等于1个或女巫和蜘蛛数量少于2个，提示怪物被别人打死
                        let arr = this.getGhostsByGhostType(ghostType)
                        if ((arr.length <= 2 && ghostType !== 'demon') || (arr.length === 1 && ghostType === 'demon')) {
                            this.message(err.message)
                            this.removeMonster(ghostType, randomMonster.monster_id)
                        }
                    }
                })
            })
        },
        goToOtherScene () {
            let scene
            let path
            let currentData = this.currentData
            if (currentData.lucky11.length !== 0) {
                scene = _('Lucky11')
                path = 'lucky11'
            } else if (currentData.poker.length !== 0) {
                scene = _('LuckyPoker')
                path = 'luckyPoker'
            } else if (currentData.slot.length !== 0) {
                scene = _('LuckySlot')
                path = 'luckyslot'
            } else if (currentData.luckycoin.length !== 0) {
                scene = _('LukcyCoin')
                path = 'luckycoin'
            }
            if (scene) {
                this.message(_(this.$lang.halloween.a2, _('LuckyPoker')), () => {
                    this.$router.push({
                        path: `/${path}`
                    }, () => {
                        this.jumpToOtherScene = true
                    })
                })
            }
        },
        message (message, callback = () => {}) {
            Notification({
                message: message,
                dangerouslyUseHTMLString: true,
                position: 'bottom-left',
                duration: 5000,
                customClass: 'halloween-msg',
                onClick: callback,
                showClose: false
            })
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
            return this.$store.dispatch('cs_halloween/getGhosts')
                .then(res => {
                    // demon 1.5, ghost 1.0 jackolantern 0.5
                    clearTimeout(this.nextTimer)
                    this.nextRefreshTime = res.data.last_time
                    this.setNextRefresh(this.nextRefreshTime)
                    this.currentData = res.data
                    if (this.jumpToOtherScene) {
                        if (this.isNoGhost()) {
                            this.message(this.$lang.halloween.a1)
                            if (!this.isAllNoGhost()) {
                                setTimeout(() => this.goToOtherScene(), 1000)
                            }
                        } else {
                            this.jumpToOtherScene = false
                        }
                    }
                    return res
                })
        },
        setNextRefresh (nextTime) {
            let time = Number(nextTime) * 1000
            let offset = time - Date.now()
            if (offset > 0) {
                let nextTime = offset + Math.randm() * 600
                this.nextTimer = setTimeout(() => {
                    this.getGhosts()
                }, nextTime)
            }
        },
        clearGhostStatus () {
            this.ghost1 = { x: -169, y: 0, direction: true, speed: 0.01, animate: false, isWin: false }
            this.ghost11 = { x: window.document.body.clientWidth, y: 0, direction: false, speed: 0.01, animate: false, isWin: false }
            this.ghost2 = { isWin: false }
            this.ghost22 = { isWin: false }
            this.ghost3 = { isWin: false, bottom: 0 }
            this.isAjax = false
            this.currentData = null
        },
        refreshGame () {
            this.$nextTick(() => {
                this.clearGhostStatus()
                this.onScroll()
                this.getGhosts()
            })
        },
        closeGame () {
            clearInterval(this.timer)
            clearTimeout(this.animateTimer)
            clearTimeout(this.nextTimer)
            this.clearGhostStatus()
            this.$emit('update:show', false)
        }
    },
    mounted () {
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
        },
        scene () {
            var scenes = {
                lucky11: 'lucky11',
                'luckycoin-home': 'luckycoin',
                luckyPoker: 'poker',
                luckySlot: 'slot'
            }
            return scenes[this.$route.name] || ''
        },
        currBalance () {
            return this.$store.state.currBalance
        },
        skulls () {
            if (this.currentData) {
                return this.currentData[this.scene].filter(ghost => ghost.monster_type === 'demon')
            }
            return []
        },
        witchs () {
            if (this.currentData) {
                return this.currentData[this.scene].filter(ghost => ghost.monster_type === 'ghost')
            }
            return []
        },
        spiders () {
            if (this.currentData) {
                return this.currentData[this.scene].filter(ghost => ghost.monster_type === 'jackolantern')
            }
            return []
        }
    },
    watch: {
        isLogin (value) {
            value && this.getGhosts()
        },
        show (value) {
            value && this.playMusic()
            value && this.startGame()
            value && this.$nextTick(() => {
                this.refreshGame()
            })
            if (value && !this.isCCAccount()) {
                this.changeToCCAccount()
            }
        },
        scene () {
            this.$nextTick(() => {
                this.refreshGame()
            })
            if (!this.isCCAccount()) {
                this.changeToCCAccount()
            }
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
        font-size: 30px;
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
<style>
.go-now {
    background: #f66400;
    padding: 2px 10px;
    color: #FFF !important;
    border-radius: 3px;
    margin: 0 10px;
}
.halloween-msg {
    background: url(../../assets/img/halloween/messageBox.png) no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
}
</style>
