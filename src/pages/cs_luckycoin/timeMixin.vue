<script>
export default {
    data () {
        return {
            leftTime: 0,
            leftTimer: null
        }
    },
    methods: {
        renderTime (endtime) {
            if (endtime && endtime !== '0') {
                let endTime = Number(endtime) * 1000
                let thisTime = (new Date()).getTime()
                // this.leftTime = [24 * 60 * 60 * 1000 + 10000, 48 * 60 * 60 * 1000, 160 * 60 * 60 * 1000, 48 * 60 * 60 * 1000, 23 * 60 * 60 * 1000, 10 * 60 * 60 * 1000, 500 * 1000, 20 * 60 * 1000, 20 * 1000][this.ind] || endTime - thisTime
                this.leftTime = endTime - thisTime
                if (this.leftTime < 0) {
                    this.triggerWaitting && this.triggerWaitting()
                    this.leftTime = 0
                    return
                }
                this.clearTimer()
                if (this.leftTime < 10 * 60 * 1000) {
                    this.renderLastTime()
                } else {
                    this.renderOtherTime()
                }
            }
        },
        renderOtherTime () {
            this.leftTimer = setInterval(() => {
                if (this.leftTime < 10 * 60 * 1000) {
                    clearInterval(this.leftTimer)
                    this.renderLastTime()
                } else if (this.leftTime > 1000) {
                    this.leftTime -= 1000
                } else {
                    if (this.leftTime !== 0) {
                        this.triggerTimeout && this.triggerTimeout()
                    }
                    this.leftTime = 0
                    this.clearTimer()
                }
            }, 1000)
        },
        renderLastTime () {
            this.leftTimer = setInterval(() => {
                if (this.leftTime > 40) {
                    this.leftTime -= 40
                } else {
                    if (this.leftTime !== 0) {
                        this.triggerTimeout && this.triggerTimeout()
                    }
                    this.leftTime = 0
                    this.clearTimer()
                }
            }, 40)
        },
        formatTimeNum (num) {
            return Number(num < 10) ? `0${num}` : num
        },
        formatDaysTime (time) {
            let thisTime = Math.floor(time / 1000)
            return _('{0}d {1}h', Math.floor(thisTime / (3600 * 24)), Math.floor(thisTime / 3600) % 24)
        },
        formatDayTime (time) {
            let thisTime = Math.floor(time / 1000)
            if (thisTime > 10 * 60) {
                return _('{0}:{1}:{2}', this.formatTimeNum(Math.floor(thisTime / 3600)), this.formatTimeNum(Math.floor(thisTime / 60) % 60), this.formatTimeNum(thisTime % 3600 % 60))
            } else {
                return _('{0}:{1}:{2}', this.formatTimeNum(Math.floor(thisTime / 60) % 60), this.formatTimeNum(thisTime % 3600 % 60), this.formatTimeNum(parseInt(time % 1000 / 10, 10)))
            }
        },
        clearTimer () {
            if (this.leftTimer !== null) {
                clearInterval(this.leftTimer)
                this.leftTimer = null
            }
        }
    },
    computed: {
        endTimeText () {
            let oneDay = 24 * 3600 * 1000
            if (this.leftTime === 0) {
                return '00:00:00'
            } else if (this.leftTime >= oneDay) {
                return this.formatDaysTime(this.leftTime)
            } else if (this.leftTime < oneDay) {
                return this.formatDayTime(this.leftTime)
            } else {
                return '00:00:00'
            }
        }
    },
    destroyed () {
        this.clearTimer()
    }
}
</script>
