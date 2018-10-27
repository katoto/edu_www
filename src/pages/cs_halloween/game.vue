<template>
    <div class="game-main" ref="game" v-if="isLogin && show">
        <audio :src="musicSrc" class="poker-audio" ref="musicObj" loop="loop">
        </audio>
        <i class="music-btn" @click="switchMusic" ref="musicBtn" :class="{'pause':isPause}">
        </i>
        <i class="close-btn" @click="closeGame" ref="closeBtn">
        </i>
        <i class="hammer-btn" :style="{transform: `translate(${hammerX}px,${hammerY}px)`}" v-if="!hideHammer">
        </i>
        <i class="ghost1-ct" :style="{transform: `translate(${ghost1.x}px,${ghost1.y}px) `, top: `${ghost1.top}px`}" @click="beatIt('ghost', 'ghost1', ghost1.monsterId)" :class="{beating: isBeating, isWin: ghost1.isWin, filp: !ghost1.direction}" ref="ghost1" v-if="ghost1">
            <p class="prize">+1.0CC</p>
            <i class="star1"></i>
            <i class="star2"></i>
            <i class="star3"></i>
            <img src="@/assets/img/halloween/monster01.png" :style="{transform: `rotateY(${ghost1.direction ? '0deg' : '180deg'})`}" draggable="false" class="ghost1" v-if="ghost1.animate">
            <img src="@/assets/img/halloween/monster02.png" :style="{transform: `rotateY(${ghost1.direction ? '0deg' : '180deg'})`}" draggable="false" class="ghost1" v-else>
        </i>
        <i class="ghost11-ct" :style="{transform: `translate(${ghost11.x}px,${ghost11.y}px) `, top: `${ghost11.top}px`}" @click="beatIt('ghost', 'ghost11', ghost11.monsterId)" :class="{beating: isBeating, isWin: ghost11.isWin, filp: !ghost11.direction}" ref="ghost11" v-if="ghost11">
            <p class="prize">+1.0CC</p>
            <i class="star1"></i>
            <i class="star2"></i>
            <i class="star3"></i>
            <img src="@/assets/img/halloween/monster01.png" :style="{transform: `rotateY(${ghost11.direction ? '0deg' : '180deg'})`}" draggable="false" class="ghost1" v-if="ghost11.animate">
            <img src="@/assets/img/halloween/monster02.png" :style="{transform: `rotateY(${ghost11.direction ? '0deg' : '180deg'})`}" draggable="false" class="ghost1" v-else>
        </i>
        <i class="ghost2-ct" :style="{ left: `${ghost2.left}px`}" @click="beatIt('jackolantern', 'ghost2', ghost2.monsterId)" :class="{beating: isBeating, isWin: ghost2.isWin}" ref="ghost2" v-if="ghost2">
            <p class="prize">+0.5CC</p>
            <i class="star1"></i>
            <i class="star2"></i>
            <i class="star3"></i>
            <img src="@/assets/img/halloween/monster11.png" draggable="false" class="ghost2" v-if="animateStatus <= 2">
            <img src="@/assets/img/halloween/monster12.png" draggable="false" class="ghost2" v-else>
        </i>
        <i class="ghost21-ct" :style="{ left: `${ghost21.left}px`}"  @click="beatIt('jackolantern', 'ghost21', ghost21.monsterId)" :class="{beating: isBeating, isWin: ghost21.isWin}" ref="ghost21" v-if="ghost21">
            <p class="prize">+0.5CC</p>
            <i class="star1"></i>
            <i class="star2"></i>
            <i class="star3"></i>
            <img src="@/assets/img/halloween/monster11.png" draggable="false" class="ghost2" v-if="animateStatus >= 2">
            <img src="@/assets/img/halloween/monster12.png" draggable="false" class="ghost2" v-else>
        </i>
        <i class="ghost3-ct" @click="beatIt('demon', 'ghost3', ghost3.monsterId)" :class="{beating: isBeating, isWin: ghost3.isWin}" :style="{bottom: `${ghost3Bottom}px`}" ref="ghost3" v-if="ghost3">
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
            ghost1: null,
            ghost11: null,
            ghost2: null,
            ghost21: null,
            ghost3: null,
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
            lastHightIndex: 0,
            lastWidthIndex: 0,
            ghost3Bottom: 0
        }
    },
    methods: {
        getRandomLeft () {
            let random
            if (this.lastWidthIndex === 0) {
                random = Math.floor((Math.random()) * 500)
            } else {
                random = Math.floor((Math.random()) * 500) + 500
            }
            this.lastWidthIndex = this.lastWidthIndex === 0 ? 1 : 0
            return random
        },
        getRandomHeight () {
            let random
            if (this.lastHightIndex === 0) {
                random = Math.floor((Math.random()) * 150)
            } else {
                random = Math.floor((Math.random()) * 150) + 200
            }
            this.lastHightIndex = this.lastHightIndex === 0 ? 1 : 0
            return random
        },
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
        createMonster (ghostType) {
            let monsterId
            if (ghostType === 'ghost1' && this.witchs[0]) {
                monsterId = this.witchs[0].monster_id
                this.ghost1 = {
                    x: -169,
                    y: 0,
                    direction: true,
                    speed: 0.01,
                    animate: false,
                    isWin: false,
                    top: this.getRandomHeight(),
                    monsterId
                }
            } else if (ghostType === 'ghost11' && this.witchs[0]) {
                monsterId = this.witchs[0].monster_id
                this.ghost11 = {
                    x: window.document.body.clientWidth,
                    y: 0,
                    direction: false,
                    speed: 0.01,
                    animate: false,
                    isWin: false,
                    top: this.getRandomHeight(),
                    monsterId
                }
            } else if (ghostType === 'ghost2' && this.spiders[0]) {
                monsterId = this.spiders[0].monster_id
                this.ghost2 = {
                    isWin: false,
                    left: this.getRandomLeft(),
                    monsterId
                }
            } else if (ghostType === 'ghost21' && this.spiders[0]) {
                monsterId = this.spiders[0].monster_id
                this.ghost21 = {
                    isWin: false,
                    left: this.getRandomLeft(),
                    monsterId
                }
            } else if (ghostType === 'ghost3' && this.skulls[0]) {
                monsterId = this.skulls[0].monster_id
                this.ghost3 = {
                    isWin: false,
                    monsterId
                }
            }
            this.removeMonster(ghostType, monsterId)
        },
        updateCC (money) {
            let updateMoney = Number(money).toFixed(4)
            if (this.isCCAccount() && !isNaN(Number(updateMoney))) {
                let data = { ...this.currBalance, balance: updateMoney }
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
            !this.isPause && this.loadMusic.then(() => {
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
        moveGhost (ghost) {
            if (ghost === null) {
                return
            }
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
            this.moveGhost(this.ghost1)
            this.moveGhost(this.ghost11)
        },
        startGame () {
            if (this.animateTimer) {
                clearTimeout(this.animateTimer)
                this.animateTimer = null
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
        selectMonster (ghostType) {
            let arr = this.getGhostsByGhostType(ghostType)
            return arr[0]
        },
        isNoGhost () {
            return this.currentData[this.scene].length === 0 && this.ghost1 === null && this.ghost11 === null && this.ghost2 === null && this.ghost21 === null && this.ghost3 === null
        },
        isAllNoGhost () {
            let currentData = this.currentData

            if (currentData) {
                return currentData.lucky11.length === 0 && currentData.luckycoin.length === 0 && currentData.poker.length === 0 && currentData.slot.length === 0 && this.isNoGhost()
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
        beatIt (ghostType, ghostRefName, monsterId) {
            // demon 1.5, ghost 1.0 jackolantern 0.5
            if (!this.isBeating) {
                setTimeout(() => {
                    this.isBeating = false
                }, 100)
                this.isBeating = true
            }
            if (this[ghostRefName] && this[ghostRefName].isWin) {
                return
            }
            this.onSecondRunOnce(() => {
                this.beatAjax({
                    monster_id: monsterId,
                    monster_type: ghostType,
                    last_time: this.nextRefreshTime,
                    scene: this.scene
                }).then(res => {
                    console.log(monsterId, ghostRefName, res.data.remain)
                    this[ghostRefName].isWin = true
                    setTimeout(() => {
                        if (this[ghostRefName]) {
                            this[ghostRefName].isWin = false
                        }
                    }, 1000)
                    this.updateCC(res.data.total)
                    if (Number(res.data.remain) === 0) {
                        // 怪物被自己打死

                        setTimeout(() => {
                            this[ghostRefName] = null
                            if (this.isAllNoGhost()) {
                                this.message('妖怪已被消灭完，请稍后再来')
                                return
                            }
                            if (this.isNoGhost()) {
                                this.goToOtherScene()
                            }
                        }, 1000)
                        setTimeout(() => {
                            this.createMonster(ghostRefName)
                        }, 3000)
                    }
                }).catch(err => {
                    this.message(err.message)
                    this[ghostRefName] = null
                    setTimeout(() => {
                        this.createMonster(ghostRefName)
                    }, 3000)
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
                this.message(_(this.$lang.halloween.a2, scene), () => {
                    this.$router.push({
                        path: `/${path}`
                    })
                })
            }
        },
        message (message, callback = () => { }) {
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
                    this.ghost3Bottom = dis - footerTop
                } else {
                    this.ghost3Bottom = 0
                }
            }
        },
        renderGhosts () {
            if (this.skulls.length > 0) {
                this.createMonster('ghost3')
            } else {
                this.ghost3 = null
            }
            if (this.witchs.length > 0) {
                this.createMonster('ghost1')
                this.createMonster('ghost11')
            } else {
                this.ghost1 = null
                this.ghost11 = null
            }
            if (this.spiders.length > 0) {
                this.createMonster('ghost2')
                this.createMonster('ghost21')
            } else {
                this.ghost2 = null
                this.ghost21 = null
            }
        },
        updateCurrenData (data) {
            if (this.currentData === null) {
                this.currentData = {...data}
                this.renderGhosts()
                return
            }
            this.currentData = {...data}
            this.currentData[this.scene] = [...this.currentData[this.scene].filter(item => {
                return item.monster_id !== (this.ghost1 && this.ghost1.monsterId) &&
                        item.monster_id !== (this.ghost11 && this.ghost11.monsterId) &&
                        item.monster_id !== (this.ghost2 && this.ghost2.monsterId) &&
                        item.monster_id !== (this.ghost21 && this.ghost21.monsterId) &&
                        item.monster_id !== (this.ghost3 && this.ghost3.monsterId)
            })]
            let arr = ['ghost1', 'ghost12', 'ghost2', 'ghost21', 'ghost3']
            arr.forEach(name => {
                if (data[this.scene].filter(monster => monster.monster_id === (this[name] && this[name].monsterId)).length === 0) {
                    if (this[name]) {
                        console.log(`怪物${name},id :${this[name].monsterId}已移除到其他场景`)
                        this[name] = null
                        this.createMonster(name)
                    }
                }
            })
        },
        getGhosts () {
            return this.$store.dispatch('cs_halloween/getGhosts')
                .then(res => {
                    // demon 1.5, ghost 1.0 jackolantern 0.5
                    clearTimeout(this.nextTimer)
                    this.nextRefreshTime = res.data.next_time
                    this.setNextRefresh(this.nextRefreshTime)
                    this.updateCurrenData(res.data)
                    this.startGame()
                    return res
                })
        },
        setNextRefresh (nextTime) {
            let time = Number(nextTime) * 1000
            let offset = time - Date.now()
            if (offset > 0) {
                let offsetTime = offset + Math.random() * 600
                this.nextTimer = setTimeout(() => {
                    console.log('catch refresh game')
                    this.getGhosts()
                }, offsetTime)
            }
        },
        clearGhostStatus () {
            this.isAjax = false
            this.currentData = null
            this.ghost1 = null
            this.ghost11 = null
            this.ghost2 = null
            this.ghost21 = null
            this.ghost3 = null
        },
        refreshGame () {
            this.$nextTick(() => {
                this.clearGhostStatus()
                this.onScroll()
                this.getGhosts().then(res => {
                    if (this.isNoGhost()) {
                        this.message(this.$lang.halloween.a1)
                    }
                })
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
    created () {
        this.gameWidth = window.document.body.clientWidth
        this.gameHeight = window.document.body.clientHeight
    },
    mounted () {
        this.loadMusic = bgMusic().then(res => {
            this.musicSrc = res
            return res
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
        },
        showMosterIds () {
            let arr = []
            if (this.ghost1) {
                arr.push(this.ghost1.monsterId)
            }
            if (this.ghost11) {
                arr.push(this.ghost11.monsterId)
            }
            if (this.ghost2) {
                arr.push(this.ghost2.monsterId)
            }
            if (this.ghost21) {
                arr.push(this.ghost21.monsterId)
            }
            if (this.ghost3) {
                arr.push(this.ghost3.monsterId)
            }
            return arr
        }
    },
    watch: {
        isLogin (value) {
            value && this.getGhosts()
        },
        show (value) {
            value && this.playMusic()
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


<style lang="less" scoped type="text/less">
#lucky11 + .game-main {
  top: 160px;
}
.game-main {
  * {
    moz-user-select: -moz-none;
    -moz-user-select: none;
    -o-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  position: fixed;
  z-index: 999;
  top: 70px;
  left: 0;
  .isWin .prize {
    display: block;
    animation: moneyMove 0.8s forwards ease-in;
    animation-delay: 0.2s;
  }
  .star1,
  .star2,
  .star3 {
    display: none;
  }
  .isWin {
    .star1,
    .star2,
    .star3 {
      display: block;
      position: absolute;
      width: 26px;
      height: 26px;
      background: url(../../assets/img/halloween/star.png) no-repeat;
      background-size: 100% 100%;
      animation: starFade 0.8s forwards ease-in;
    }
  }
  .ghost1-ct,
  .ghost11-ct {
    &.isWin {
      .star1 {
        right: 39px;
        top: 69px;
        width: 33px !important;
      }
      .star2 {
        left: 63px;
        bottom: 85px;
        transform: rotate(30deg);
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
        transform: rotate(30deg);
      }
      .star3 {
        bottom: 91px;
        right: 71px;
      }
    }
  }
  .ghost2-ct,
  .ghost21-ct {
    &.isWin {
      .star1 {
        right: 39px;
        top: 39px;
        width: 33px !important;
      }
      .star2 {
        left: 25px;
        bottom: 85px;
        transform: rotate(30deg);
      }
      .star3 {
        bottom: 31px;
        right: 51px;
      }
    }
  }

  .ghost3-ct {
    &.isWin {
      .star1 {
        right: 0;
        top: 0;
        width: 33px !important;
      }
      .star2 {
        left: -40px;
        bottom: 100px;
        transform: rotate(30deg);
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
    display: block;
    width: 36px;
    height: 36px;
    cursor: pointer !important;
    background: url(../../assets/img/halloween/btn-music.png);
    margin: 10px 0 0 10px;
    &.pause {
      background: url(../../assets/img/halloween/btn-music2.png);
    }
    &:hover {
      filter: brightness(1.2);
    }
  }
  .close-btn {
    display: block;
    width: 36px;
    height: 36px;
    background: url(../../assets/img/halloween/btn-close.png);
    cursor: pointer !important;
    margin: 10px 0 0 10px;
    &:hover {
      filter: brightness(1.2);
    }
  }
  .ghost1-ct,
  .ghost11-ct,
  .ghost2-ct,
  .ghost21-ct,
  .ghost3-ct {
    position: relative;
    cursor: url(../../assets/img/halloween/01.png), auto;
    &.beating {
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

  @keyframes ghost2Down {
    0%,
    100% {
      transform: translate(0, -200px);
    }
    20%,
    40%,
    60%,
    80% {
      transform: translate(0, 150px);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      transform: translate(0, 200px);
    }
  }

  @keyframes moneyMove {
    from {
      opacity: 1;
      transform: translate(0, 0);
    }
    to {
      opacity: 0;
      transform: translate(0, -100px);
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
    51% {
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
<style lang="less"  type="text/less">
.halloween-msg {
  box-sizing: border-box;
  width: 270px;
  padding: 25px 17px;
  text-align: left;
  color: #ffffff;
  font-weight: bold;
  background: url(../../assets/img/halloween/messageBox.png) no-repeat;
  .el-notification__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 16px;
    line-height: 26px;
  }
  .go-now {
    height: 22px;
    padding: 0 13px;
    border-radius: 6px;
    background: #f66400;
    color: #fff;
    &:hover {
      filter: brightness(1.2);
    }
  }
}
</style>
