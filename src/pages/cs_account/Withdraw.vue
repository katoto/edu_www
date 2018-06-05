<template>
    <div class="withdrawal">
        <h2>withdraw</h2>
       <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="Request" name="Request">
                <li class="li-records">
                    <div class="item icon-name hide">
                        <div class="fl210 ">ETH</div>
                        <p class="bold js_withDrawal_eth"></p>
                    </div>
                    <div class="item wallet-add">
                        <div class="fl210">Wallet Address</div>
                        <input type="text">
                    </div>
                    <div class="item pick-up">
                        <div class="fl210">
                            <span class="css_withdraw_tips">Withdraw Amount</span>
                            <span class="css_withdraw_total">at least 0.01 ETH</span>
                        </div>
                        <input autocomplete="off" type="text">
                        <span class="css_withdraw_topMoney">Maximum</span>
                        <p class="pickup-tips" style="display: none">
                            Less than 0.1242 balance, please reset on withdraws
                        </p>
                    </div>
                    <div class="item account-psw">
                        <div class="fl210">
                            Account Password
                        </div>
                        <input autocomplete="new-password" type="password">
                    </div>
                    <p class="fee">
                        Fee&nbsp;&nbsp;
                        <i class="orange">0.00000</i>
                        <span class="orange"> ETH</span>
                    </p>
                    <button >Send</button>
                </li>
            </el-tab-pane>
            <el-tab-pane label="Records" name="Records">
                <li class="li-request">
                    <Filters></Filters>
                </li>
            </el-tab-pane>
        </el-tabs>
    </div> 
</template>

<script>
    import Filters from '~/components/Filter'
    export default {
        data(){
            return {
                activeName: 'Request'
            }
        },
        watch: {
          
        },
        methods: {
            handleClick(tab, event) {
                // console.log(tab, event);
            }
        },
        computed: {},
        components: {
            Filters
        },
        mounted(){

        }
    }
</script>
<style scoped lang="less">
@import "../../styles/lib-mixins.less";
li{
    list-style: none;
}
.orange{
    color: #fd9644;
}
 .withdrawal{
     h2{
        line-height: 30px;
        font-size: 24px;
        color: #263648;
        text-transform: capitalize;
     }
    .lf130{
        width:130px;
        margin-right:35px;
        float: left;
        overflow: hidden;
    }
    .fl210{
        position: relative;
        float: left;
        width:210px;
        height:50px;
        overflow: hidden;
    }

    .li-records{
        .item{
            position: relative;
            height:50px;
            line-height:50px;
            overflow: hidden;
            margin-bottom:20px;
            font-size:16px;
            .clearfix();
        }
        .wallet-add{
            margin-top:40px;
        }
        >li{
            display: none;
        }
        >li.on{
            display: block;
        }
        .icon-name{
            height:34px;
            line-height:34px;
            margin-top:17px;
            p{
                float: left;
                font-size:20px;
                color: #ff7f50;
                font-weight:bold;
            }
        }
        input{
            height:48px;
            line-height:48px;
            border:1px solid #ced6e0;
            outline:none;
            text-indent:5px;
            width:455px;
            font-size:16px;
        }
        .account-psw{
            input{
                width:275px;
            }
        }
        .pick-up{
            .css_withdraw_tips{
                display: block;
                height:16px;
                line-height:16px;
                position: absolute;
                left:0;
                top:12px;
            }
            .css_withdraw_total{
                position: absolute;
                top:33px;
                left:0;
                line-height:12px;
                font-size:12px;
            }
            .css_withdraw_topMoney{
                position: absolute;
                right: 268px;
                cursor: pointer;
                color: #6a89cc;
            }
        }
        .pickup-tips{
            position: absolute;
            top:8px;
            left:677px;
            height:36px;
            overflow: hidden;
            line-height:18px;
            font-size:14px;
            color: #fc5c65;
            text-transform: capitalize;
        }
        .fee{
            margin:0 0 0 210px;
            width:280px;
            line-height:32px;
            text-align: center;
            font-size:14px;
        }
        button{
            display: block;
            width:280px;
            height:50px;
            line-height:50px;
            overflow: hidden;
            margin:0 0 30px 210px;
            background: #fd9644;
            border-radius:6px;
            font-size:20px;
            color: #fff;
            font-weight:bold;
            .transition();
            &:hover{
                background: #f27d1f;
            }
        }
    }
}
.li-request{
    .filter{
        margin-top:24px;
    }
}


.el-tabs__active-bar{
    background: #263648 !important;
}
</style>
