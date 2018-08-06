<template>
    <div class="page-check">
        <Header></Header>
        <div class="main">
            <BreadCrumbs></BreadCrumbs>
            <!--查询框-->
            <el-tabs v-model="params.type" @tab-click="handleTabClick">
                <el-tab-pane :label="_('Lucky11')" name="Lucky11"></el-tab-pane>
                <el-tab-pane :label="_('Luckycoin')" name="Luckycoin"></el-tab-pane>
            </el-tabs>
            <div class="check-input">
                <div class="check-enter">
                    <h2><lang>Check the results</lang></h2>
                    <input type="text" :placeholder="_('Enter the issue number')" v-model="issueNumber" @keyup.enter="issueInputHandler">
                    <p><lang>The issue number can be viewed in the </lang><a href="javascript:;"><lang>draw record</lang></a></p>
                </div>
                <a href="javascript:;" class="btn-verification" @click="verifyHandler"><lang>Verification</lang></a>
                <!--rollIn animated-->
                <div class="checkout-result" :class="{ 'rollIn animated': isChecked }">
                    <h3><lang>Lottery result</lang></h3>
                    <div class="result-view">
                        <!--lucky11-->
                        <ul v-if="params.type === 'Lucky11'">
                            <li v-for="(item, index) in luck11Result" :key="index">{{item}}</li>
                        </ul>
                        <!--LuckyCoin-->
                        <div v-if="params.type === 'Luckycoin'">
                            {{luckyCoinResult.toString()}}
                        </div>
                    </div>
                </div>
            </div>
            <!--步骤说明-->
            <div class="check-explain">
                <div class="step-title">
                    <lang>Check the results</lang>
                </div>
                <div class="step-view bounce animated delay-2s">
                    <ul>
                        <li v-lang="'User order<br/>information'">
                        </li>
                        <li v-lang="'SHA256<br/>operation'"></li>
                        <li>
                            <lang>Merkel value</lang>
                        </li>
                        <li v-lang="'SHA256<br/>operation'"></li>
                        <li v-lang="'blockchain<br/>hash value'"></li>
                        <li v-lang="'SHA256<br/>operation'"></li>
                        <li v-lang="'Lottery<br/>result'"></li>
                    </ul>
                </div>
            </div>
            <!--输入前-->
            <p class="before-input" :class="{ hide: isChecked }"><lang>Enter the issue number to view the verification details</lang></p>
            <!--输入后-->
            <div class="after-input" :class="{ hide: !isChecked }">
                <lucky11 :number="issueNumber" :result.sync="luck11Result" :class="{ hide: lotid !== 1 }" ref="lucky11"></lucky11>
                <luckycoin :number="issueNumber" :result.sync="luckyCoinResult" :class="{ hide: lotid !== 2 }" ref="luckycoin"></luckycoin>
                <div class="relate-msg">
                    <p><lang>Reference Information</lang></p>
                    <p>
                        <lang>1. What is a</lang> <a href="javascript:;"><lang>hash value</lang></a> <lang>And</lang> <a href="javascript:;"><lang>online hash calculations</lang></a>?
                    </p>
                    <p>
                        <lang>2. What is the</lang> <a href="javascript:;"><lang>Merkel value</lang></a>?
                    </p>
                    <p>
                        <lang>3. Ethereum transaction inquiry entrance.</lang>
                    </p>
                </div>
            </div>
            <!--返回顶部-->
            <ScrollTop></ScrollTop>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '~components/Header'
    import Footer from '~components/Footer'
    import BreadCrumbs from '~/components/BreadCrumbs'
    import ScrollTop from '~/components/ScrollTop'
    import Lucky11 from './components/lucky11'
    import Luckycoin from './components/luckycoin'
    import { getURLParams } from '~common/util'
    
    export default {
        data () {
            return {
                isChecked: false,
                luck11Result: [],
                luckyCoinResult: 0,
                issueNumber: '',
                params: {
                    number: '',
                    type: 'Lucky11'
                }
            }
        },
        methods: {
            getURLParams,
            init () {
                var params = this.getURLParams()
                if (params.type) {
                    let type = {
                        'lucky11': 1,
                        'luckycoin': 2
                    }[params.type.toLowerCase()] || 1
                    this.params.type = ['Lucky11', 'Luckycoin'][type - 1]
                }
                if (params.number) {
                    this.params.number = params.number
                    this.getData(this.params.number)
                        .then(() => {
                            this.isChecked = true
                            this.issueNumber = this.params.number
                        })
                }
            },
            handleTabClick () {
                // TODO: 切换tab
            },
            issueInputHandler () {
                if (this.issueNumber && this.issueNumber.length > 0) {
                    this.getData(this.issueNumber)
                }
            },
            verifyHandler () {
                this.getData(this.issueNumber)
            },
            getData (number) {
                return (({
                    Lucky11: this.$refs.lucky11.getData,
                    Luckycoin: this.$refs.luckycoin.getData
                })[this.params.type])(number)
            }
        },
        computed: {
            lotid () {
                return {
                    Lucky11: 1,
                    Luckycoin: 2
                }[this.params.type]
            }
        },
        components: {
            Header, Footer, BreadCrumbs, ScrollTop, Lucky11, Luckycoin
        },
        mounted () {
            this.init()
        }
    }
</script>
<style scoped lang="less">

    .page-check{
        background: #242240;
    }
    .main{
        position: relative;
        width: 1190px;
        margin: 0 auto;
        background: #242240;
        /deep/ .step-title{
            line-height: 84px;
            font-size: 20px;
            color: #fff;
            font-weight: bold;
        }
        /deep/ .check-input{
            width: 1190px;
            height: 385px;
            overflow: hidden;
            margin: 0 auto;
            background: url("../../assets/img/check/bg-check.png") no-repeat center;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
            .check-enter{
                h2{
                    line-height: 82px;
                    font-family: sans-eb;
                    font-size: 30px;
                    font-weight: bold;
                    color: #fff;
                }
                input{
                    width: 374px;
                    height: 52px;
                    overflow: hidden;
                    outline: none;
                    border: 1px solid #788ca3;
                    border-radius: 6px;
                    background: #242240;
                    line-height: 52px;
                    text-indent: 30px;
                    font-size: 16px;
                    color: #fff;
                    &::-webkit-input-placeholder{
                        color: #788ca3;
                    }
                    &:focus{
                        border-color: #fff;
                    }
                }
                p{
                    padding-bottom: 18px;
                    line-height: 64px;
                    font-size: 14px;
                    color: #788ca3;
                }
                a{
                    color: #788ca3;
                    text-decoration: underline;
                    &:hover{
                        filter: brightness(1.3);
                    }
                }
            }
            .btn-verification{
                display: block;
                width: 150px;
                height: 60px;
                overflow: hidden;
                margin: 0 67px 0 43px;
                text-align: center;
                line-height: 60px;
                background: #fd9644;
                border-radius: 6px;
                font-size: 20px;
                color: #fff;
                font-weight: bold;
                transition: all 0.2s;
                &:hover{
                    filter: brightness(1.1);
                }
            }
            .checkout-result{
                position: relative;
                padding: 7px 40px 68px;
                border: 1px solid #6a89cc;
                border-radius: 6px;
                background: #242240;
                visibility: hidden;
                opacity: 0;
                transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);
                h3{
                    line-height: 80px;
                    font-family: sans-eb;
                    font-size: 20px;
                    color: #fff;
                    font-weight: bold;
                }
                .result-view{
                    width: 340px;
                    height: 52px;
                    overflow: hidden;
                    line-height: 52px;
                    border-bottom: 1px solid #fd9644;
                    ul{
                        display: flex;
                        justify-content: center;
                    }
                    li{
                        width: 38px;
                        height: 38px;
                        overflow: hidden;
                        margin: 0 6px;
                        border-radius: 50%;
                        background: #fd9644;
                        text-align: center;
                        line-height: 38px;
                        font-size: 20px;
                        font-weight: bold;
                        color: #fff;
                    }
                    div{
                        text-align: center;
                        font-size: 20px;
                        font-weight: bold;
                        color: #fd9644;
                    }
                }
                &::before{
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: -22px;
                    transform: translateY(-50%);
                    display: block;
                    width: 22px;
                    height: 22px;
                    background: url("../../assets/img/check/icon-arrow.png") no-repeat center;
                }
            }
        }
        /deep/ .check-explain{
            margin-top: 23px;
            .step-title{
                margin-bottom:5px;
            }
            .step-view{
                position: relative;
                width: 1021px;
                height: 204px;
                overflow: hidden;
                margin: 0 auto;
            }
            ul{
                position: absolute;
                width: 100%;
                height: 248px;
                left: 0;
                top: -44px;
                background: url("../../assets/img/check/bg-check-explain.png") no-repeat center bottom;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            li{
                flex: 1;
                line-height: 24px;
                text-align: center;
                font-size: 16px;
                font-weight: bold;
                color: #fff;
            }
            li:nth-child(2n){
                color: #6a89cc;
            }
        }
        /deep/ .before-input{
            padding-bottom: 292px;
            line-height: 54px;
            font-size: 14px;
            color: #788ca3;
        }
        /deep/ .after-input{
            margin-top: 38px;
            .item{
                position: relative;
                padding: 0 50px;
                background: #1d1c3a;
                font-size: 16px;
                color: #ffffff;
                .title-1{
                    /*overflow: hidden;*/
                    font-weight: bold;
                    color: #6a89cc;
                }
                &+.item{
                    margin-top: 32px;
                    &::before{
                        content: '';
                        position: absolute;
                        left: 50px;
                        top: -46px;
                        width: 23px;
                        height: 58px;
                        overflow: hidden;
                        background: url("../../assets/img/check/icon-and.png") no-repeat center;
                    }

                }
            }
            .item1{
                padding-top: 14px;
                padding-bottom: 25px;
                .title-1{
                    position: relative;
                    float: left;
                    padding-right: 33px;
                    line-height: 51px;
                }
                .icon-mark{
                    position: absolute;
                    top: (51-16)/2px;
                    right: 0;
                    display: block;
                    width: 16px;
                    height: 16px;
                    background: url("../../assets/img/check/icon-mark.png") no-repeat center;
                    cursor: pointer;
                }
                .btn-copy{
                    display: block;
                    float: right;
                    line-height: 51px;
                    color: #6a89cc;
                    text-decoration: underline;
                    &:hover{
                        filter: brightness(1.3);
                        color: #6a89cc;
                    }
                }
                .msg-items{
                    clear: both;
                    overflow: hidden;
                    max-height: 123px;
                    overflow: auto;
                    li{
                        float: left;
                        margin-right: 20px;
                        line-height: 41px;
                    }
                    &::-webkit-scrollbar {
                        width: 6px;
                    }
                    &::-webkit-scrollbar-thumb {
                        border-radius: 6px;
                        background: rgba(120,140,163,0.5);
                    }
                    &::-webkit-scrollbar-track{
                        border-radius: 6px;
                        background: #1d1c3a;
                    }
                }
            }
            .item2{
                padding-top: 38px;
                padding-bottom: 46px;
                line-height: 41px;
            }
            .item3{
                padding-top: 37px;
                padding-bottom: 36px;
                line-height: 37px;
                a{
                    color: #fff;
                    text-decoration: underline;
                    font-weight: bold;
                    &:hover{
                        filter: brightness(1.3);
                    }
                }
            }
            .item4{
                padding-top: 27px;
                p{
                    font-size: 14px;
                    color: #6a89cc;
                }
                .title-1{
                    line-height: 45px;
                }
            }
            .abox{
                width: 128px;
                height: 28px;
                overflow: hidden;
                line-height: 28px;
                overflow: hidden;
                border: 2px solid #6a89cc;
                background: #6a89cc;
                border-radius: 14px;
                text-align: center;
                i{
                    float: left;
                    width: 42px;
                    font-weight: bold;
                }
                span{
                    display: block;
                    height: 28px;
                    overflow: hidden;
                    background: #1d1c3a;
                }
            }
        }
        /deep/ .result-lucky11{
            padding-bottom: 56px;
            p{
                &.p1{
                    line-height: 44px;
                }
                &.p2{
                    margin-top: 30px;
                    line-height: 66px;
                }
                &.p3{
                    margin-top: 27px;
                    line-height: 40px;
                    text-align: center;
                    color: #788ca3;
                }
                &.p4{
                    line-height: 61px;
                    font-size: 16px;
                }
            }
            .hash{
                line-height: 34px;
                span{
                    margin-left: 12px;
                    text-decoration: underline;
                    font-weight: bold;
                    i+i{
                        margin-left: 12px;
                    }
                }
            }
            .icon-down{
                width: 18px;
                height: 19px;
                overflow: hidden;
                background: url("../../assets/img/check/icon-down.png") no-repeat center;
                margin: 7px 0 13px 310px;

            }
            .hash-5{
                overflow: hidden;
                li{
                    float: left;
                    margin-right: 34px;
                }
            }
            .mod-5{
                margin:17px 0 0 0;
                >li{
                    position: relative;
                    width: 428px;
                    float: left;
                    margin-right: 50px;
                    border: 2px dashed #788ca3;
                    border-radius: 6px;
                    margin-bottom: 50px;
                    &:last-child{
                        margin-bottom: 0;
                    }
                }
                .mod-top{
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    top: -16px;
                    background: #1d1c3a;
                    display: flex;
                    justify-content: start;
                    align-items: center;
                    padding: 0 10px;
                    .abox{
                        margin-right: 10px;
                    }
                }
                .number-box{
                    display: flex;
                    justify-content: center;
                    margin-top: 34px;
                    li{
                        margin: 0 2px;
                        div{
                            width: 30px;
                            height: 30px;
                            overflow: hidden;
                            border-radius: 50%;
                            background: #383e5a;
                            text-align: center;
                            line-height: 30px;
                        }
                        &::before{
                            content: attr(data-count);
                            display: block;
                            width: 30px;
                            line-height: 36px;
                            text-align: center;
                            color: #788ca3;
                        }
                        &.on{
                            div{
                                background: #6a89cc;
                                font-weight: bold;
                            }
                            &::before{
                                color: #fff;
                                font-weight: bold;
                            }
                        }
                    }

                }
            }
            .finally-result{
                margin-top: 24px;
                ul{
                    overflow: hidden;
                }
                li{
                    float: left;
                    margin-right: 8px;
                    width: 30px;
                    height: 30px;
                    overflow: hidden;
                    background: #fd9644;
                    border-radius: 50%;
                    text-align: center;
                    line-height: 30px;
                    font-weight: bold;

                }
            }
        }
        /deep/ .result-onecoin{
            padding-bottom: 52px;
            p{
                &.p1{
                    line-height: 44px;
                }
                &.p2{
                    line-height: 44px;
                    margin-top: 17px;
                }
                &.p3{
                    line-height: 35px;
                    margin-top: 30px;
                }
            }
            div{
                line-height: 35px;
            }
            i.special{
                display: inline-block;
                height: 35px;
                line-height: 35px;
                padding: 0 6px;
                font-weight: bold;
                background: #3b3a65;
                border-radius: 4px;
            }
            .finally-result{
                line-height: 38px;
                font-size: 20px;
                color: #fd9644;
                font-weight: bold;
            }
        }
        /deep/ .relate-msg{
            padding: 36px 0 190px 0;
            line-height: 24px;
            color: #6a89cc;
            background: #242240;
            a{
                text-decoration: underline;
                &:hover{
                    filter: brightness(1.3);
                    color: #6a89cc;
                }
            }
        }
        /*漂浮规则*/
        /deep/ .rule-view{
            position: absolute;
            top: -185px;
            left: -33px;
            padding: 4px 26px 70px;
            background: #ffffff;
            border-radius: 6px;
            p{
                line-height: 68px;
                color: #788ca3;
            }
            ul{
                display: flex;
                justify-content: center;
                li{
                    position: relative;
                    line-height: 20px;
                    border-bottom: 2px solid #bdc9e6;
                    font-size: 20px;
                    color: #6a89cc;
                    font-weight: bold;
                    &::after{
                        content: attr(data-msg);
                        position: absolute;
                        left: 50%;
                        top: 22px;
                        transform: translateX(-50%);
                        line-height: 24px;
                        font-size: 14px;
                        font-weight: normal;
                    }
                }
                li+li{
                    margin-left: 33px;
                    &::before{
                        content: '#';
                        width: 33px;
                        text-align: center;
                        position: absolute;
                        left: -33px;
                        top: 0;
                    }
                }
            }
            &::after{
                content: '';
                display: block;
                position: absolute;
                left: 30px;
                bottom: -15px;
                width: 0;
                height: 0;
                border-bottom: none;
                border-left: 11.5px solid transparent;
                border-right: 11.5px solid transparent;
                border-top: 15px solid #fff;
            }
        }
        /deep/ .el-tabs {
            width: 92%;
            .el-tabs__item {
                color: #aa85ff;
                &.is-active {
                    color: #fff;
                }
            }
            .el-tabs__active-bar {
                background-color: #fff;
            }
            .el-tabs__nav-wrap::after {
                background-color: #412057;
            }
        }
    }
</style>
