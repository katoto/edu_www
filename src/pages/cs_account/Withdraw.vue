<template>
    <div>
        <div class="withdrawal visible-lg">
            <h2>
                <lang>withdraw</lang>
            </h2>
            <router-link class="withdraw" :to="{path:'/help/helpView/1/1'}">
                <lang>How to withdraw ?</lang>
            </router-link>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane :label="_('Request')" name="Request">
                    <li class="li-records">
                        <div class="item chose-coin ">
                            <div class="fl210 "><lang>Select Currency</lang></div>
                            <p>
                                <el-select v-model="tranOptionVal" @change="changeCoin">
                                    <el-option v-for="item in this.userInfo.accounts" :key="item.cointype"
                                               :label="formateCoinType(item.cointype)" :value="item">
                                    </el-option>
                                </el-select>
                                <!--Withdraw amount:-->
                                <!--<i class="orange bold"></i> , -->
                                <lang>Current balance</lang> {{ formateBalance(currBalance.balance) }} {{formateCoinType(currBalance.cointype) }}
                                <i class="icon-mark hide" @mousemove="ShowMarkView=true" @mouseout="ShowMarkView=false">
                                    <div class="mark-view" :class="{on:ShowMarkView}">
                                        <lang>The amount of the event, you need to meet the flow conditions to withdraw View detailed rules Also need 0.234ETH water strip</lang>
                                        <a href="javascript:;"><lang>View detailed rules</lang></a>
                                    </div>
                                </i>
                            </p>
                        </div>
                        <div class="wallet-add">
                            <div class="fl210">
                                <lang>Wallet Address</lang>
                            </div>
                            <input v-model="withdrawAddr" @input="checkAddrLen" name="wallet" type="text">
                            <p class="wallet_warn">{{_("Only support {0} wallet",formateCoinType(currBalance.cointype)) }}</p>
                        </div>
                        <div class="item pick-up">
                            <div class="fl210">
                            <span class="css_withdraw_tips">
                                <lang>Withdrawal Amount</lang>
                            </span>
                                <template v-if="currBalance">
                                <span v-if=" Number( currBalance.balance)> parseFloat(currBalance.draw_limit) "
                                      class="css_withdraw_total">{{ currBalance.draw_limit }} ~
                                <span>{{ formateBalance( parseFloat(currBalance.balance)-parseFloat(currBalance.fee) ) }}</span> {{ formateCoinType( currBalance.cointype ) }}</span>
                                    <span v-else class="css_withdraw_total">
                                <lang>at least {{ currBalance.draw_limit }} {{ formateCoinType( currBalance.cointype ) }}</lang>
                            </span>
                                </template>
                            </div>
                            <input v-model="withdrawAmount" autocomplete="off" type="text">
                            <span @click="checkMaximum" class="css_withdraw_topMoney hide">
                            <lang>Maximum</lang>
                        </span>
                        </div>
                        <div class="item account-psw">
                            <div class="fl210">
                                <lang>Account Password</lang>
                            </div>
                            <input v-model="withdrawPsw" autocomplete="new-password" type="password">
                        </div>
                        <p class="fee">
                            <lang>Fee</lang>&ensp;
                            <i v-if="currBalance">{{ currBalance.fee }}</i><i>{{formateCoinType(currBalance.cointype) }}</i>
                        </p>
                        <button @click="sendDraw">
                            <lang>Withdraw</lang>
                        </button>
                    </li>
                </el-tab-pane>
                <el-tab-pane :label="_('Records')" name="Records">
                    <li class="li-request">
                        <section class="cs-select">
                            <el-select v-model="withdrawOptionVal" @change="handleStatusChange">
                                <el-option v-for="item in withdrawOptions" :key="item.value" :label="item.label"
                                           :value="item.value">
                                </el-option>
                            </el-select>
                            <el-select v-model="withdrawTimeOptionVal" @change="handleStatusChange">
                                <el-option v-for="item in withdrawTimeOptions" :key="item.value" :label="item.label"
                                           :value="item.value">
                                </el-option>
                            </el-select>

                            <!-- btc -->
                            <el-select v-model="ethOptionVal" @change="handleStatusChange">
                                <el-option v-for="item in ethOptions" :key="item.value" :label="item.label"
                                           :value="item.value">
                                </el-option>
                            </el-select>

                        </section>
                        <template>
                            <el-table :data="orderList" stripe size="small" highlight-current-row style="width: 100%">
                                <el-table-column align="center" header-align="center" type="index" :label="_('No. ')">
                                </el-table-column>
                                <el-table-column align="center" header-align="center" prop="drawtime"
                                                 :label="_('Transaction Time ')">
                                </el-table-column>
                                <el-table-column align="center" header-align="center" :label="_('Transaction Address')">
                                    <template slot-scope="scope">
                                        <div v-html="scope.row.to_addrHtml"></div>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" header-align="center" prop="cointype" :label="_('Type ')">
                                </el-table-column>
                                <el-table-column align="center" header-align="center" prop="drawmoney" :label="_('Amount')">
                                </el-table-column>
                                <el-table-column align="center" header-align="center" prop="drawfee" :label="_('Fee')">
                                </el-table-column>
                                <el-table-column align="center" header-align="center" prop="drawstatus"
                                                 :label="_('Status')">
                                </el-table-column>
                                <el-table-column align="center" header-align="center" prop="balance" :label="_('Balance')">
                                </el-table-column>
                            </el-table>
                            <div class="pagination">
                                <el-pagination @current-change="handleCurrentChange"
                                               @size-change="withdrawSizeChange"
                                               background :current-page.sync="pageno"
                                               size="small"
                                               :page-sizes="[10, 25, 50, 100]"
                                               :page-size="pageSize"
                                               layout="sizes,prev, pager, next,jumper"
                                               :total="PageTotal"
                                               :next-text="_('Next >')" :prev-text="_('< Front')">
                                </el-pagination>
                            </div>
                        </template>
                    </li>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="h5-withdrawal hidden-lg">
            <div class="tab">
                <ul>
                    <li :class="{on:h5activeName == 'Request'}"  @click="h5activeName= 'Request'">
                        <lang>Request</lang>
                    </li>
                    <li :class="{on:h5activeName == 'Records'}" @click="h5activeName= 'Records'">
                        <lang>Records</lang>
                    </li>
                </ul>
            </div>
            <div class="div-records" v-if="h5activeName=='Request'">
                <router-link class="btn-tohelp" :to="{path:'/help/helpView/1/1'}">
                </router-link>
                <div class="chose-coin">
                    <div class="tips">
                        <lang>Select Currency</lang>
                    </div>
                    <el-select v-model="tranOptionVal" @change="changeCoin">
                        <el-option v-for="item in this.userInfo.accounts" :key="item.cointype"
                                   :label="formateCoinType(item.cointype)" :value="item">
                        </el-option>
                    </el-select>
                    <p>
                        <lang>Current balance</lang>
                        <i>
                            {{ formateBalance(currBalance.balance) }}
                            {{formateCoinType(currBalance.cointype) }}
                        </i>
                    </p>
                </div>
                <div class="item wallet-add">
                    <div class="tips">
                        <p><lang>Wallet Address</lang></p>
                        <p class="orange">{{_("Only support {0} wallet",formateCoinType(currBalance.cointype)) }}</p>
                    </div>
                    <input v-model="withdrawAddr" @input="checkAddrLen" name="wallet" type="text">
                </div>
                <div class="item pick-up ">
                    <div class="tips">
                        <p>
                            <lang>Withdrawal Amount</lang>
                        </p>
                        <p v-if="currBalance" style="color: #778ca3;">
                            <span v-if=" Number( currBalance.balance)> parseFloat(currBalance.draw_limit) ">
                                {{ currBalance.draw_limit }} ~
                            <span>{{ formateBalance( parseFloat(currBalance.balance)-parseFloat(currBalance.fee) ) }}</span>
                                {{ formateCoinType( currBalance.cointype ) }}
                            </span>
                            <span v-else>
                                <lang>at least {{ currBalance.draw_limit }} {{ formateCoinType( currBalance.cointype ) }}</lang>
                            </span>
                        </p>
                    </div>
                    <input v-model="withdrawAmount" autocomplete="off" type="text">
                </div>
                <div class="item account-psw ">
                    <div class="tips">
                        <p>
                            <lang>Account Password</lang>
                        </p>
                        <p style="color: #778ca3;">
                            <lang>Fee</lang>&ensp;
                            <i v-if="currBalance">{{ currBalance.fee }}{{formateCoinType(currBalance.cointype) }}</i>
                        </p>
                    </div>
                    <input v-model="withdrawPsw" autocomplete="new-password" type="password">
                </div>
                <button @click="sendDraw">
                    <lang>Withdraw</lang>
                </button>
            </div>
            <div class="div-request" v-else>
                <section class="cs-select">
                    <el-select v-model="withdrawOptionVal" @change="handleStatusChange">
                        <el-option v-for="item in withdrawOptions" :key="item.value" :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="withdrawTimeOptionVal" @change="handleStatusChange">
                        <el-option v-for="item in withdrawTimeOptions" :key="item.value" :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>

                    <!-- btc -->
                    <el-select v-model="ethOptionVal" @change="handleStatusChange">
                        <el-option v-for="item in ethOptions" :key="item.value" :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>

                </section>
                <template v-if="orderList.length>0">
                    <ul>
                        <li v-for="item in orderList" :key="item.index">
                            <div class="item-re item-re1">
                                <p>
                                    {{item.drawtime.substr(5)}}
                                </p>
                                <p>
                                    {{item.drawstatus}}
                                </p>
                            </div>
                            <div class="item-re item-re2">
                                <a :title=item.to_addr :href="`https://etherscan.io/address/`+item.to_addr" target="_blank">
                                    {{item.to_addr}}
                                </a>
                                <p>
                                    {{item.drawmoney}} {{item.cointype}}
                                </p>
                            </div>
                        </li>
                    </ul>
                    <a href="javascript:;" class="btn-more" @click="handleCurrentChange(h5pageno)" v-if="isShowMoreBtn">
                        <lang>Click to see more</lang>
                    </a>
                </template>
                <div class="nomsg" v-else>
                    <img src="@/assets/img/nomsg.png" alt="">
                    <p>
                        <lang>No Data</lang>
                    </p>
                </div>
            </div>
        </div>

        <!-- 转账确认-->
        <div class="pop pop-transfer" :class="{'hide':!showTransfer}">
            <div class="pop-body">
                <div class="pop-ani">
                    <div class="pop-main">
                        <a href="javascript:;" class="btn-close" @click="showTransfer=false">close</a>
                        <h3>
                            <lang>Confirm Withdrawal</lang>
                        </h3>
                        <div class="trans-items">
                            <div class="trans-msg top-top">
                                <span class="fl">
                                    <lang>Amount</lang>
                                </span>
                                <span class="fr">{{formateCoinType(currBalance.cointype) }}</span>
                                <p class="fr">{{ withdrawAmount }}</p>
                            </div>
                            <div class="trans-msg">
                                <span class="fl">
                                    <lang>Fee</lang>
                                </span>
                                <span class="fr">{{formateCoinType(currBalance.cointype) }}</span>
                                <p v-if="currBalance" class="fr">{{ currBalance.fee }}</p>
                            </div>
                            <div class="trans-msg">
                                <span class="fl">
                                    <lang>Total</lang>
                                </span>
                                <span class="fr">{{formateCoinType(currBalance.cointype) }}</span>
                                <p class="fr">{{ formateBalance(Number( withdrawAmount) + Number(currBalance.fee)) }}</p>
                            </div>
                        </div>
                        <p class="trans-add1">
                            <lang>Transfer to</lang>
                        </p>
                        <p class="trans-add2">{{ withdrawAddr }}</p>
                        <a href="javascript:;" v-clipboard:copy="withdrawAddr" v-clipboard:success="copySucc"
                           v-clipboard:error="copyError" class="trans-copy ">
                            <lang>Copy</lang>
                        </a>
                        <a href="javascript:;" @click="upWithdraw" class="pop-btn">
                            <lang>Confirm</lang>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- 转账 成功  -->
        <div class="pop pop-reg-success" :class="{'hide':!showTransferSucc}">
            <div class="pop-body">
                <div class="pop-ani">
                    <div class="pop-main">
                        <a href="javascript:;" class="btn-close" @click="showTransferSucc=false">close</a>
                        <h3>
                            <lang>Transfer Successful</lang>
                        </h3>
                        <div class="icon-face on">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                                <circle cx="20.5" cy="23.5" r="3.5" fill="#20bf6b"></circle>
                                <circle cx="43.5" cy="23.5" r="3.5" fill="#20bf6b"></circle>
                                <path class="mouth" d="M18 40 C28,45 33,46 46,40" stroke="#20bf6b" fill="none"
                                      style="stroke-width: 4px;"></path>
                                <path class="cheek" d="M58 47  A 30 30 0 1 0 50 56" fill="none" stroke="#20bf6b"
                                      style="stroke-width: 4px;"></path>
                            </svg>
                        </div>
                        <p v-lang="'The transfer is successful. Details<br>can be obtained for details.'">
                        </p>
                        <a href="javascript:;" @click="closeTransferSucc" class="btn-success">
                            <lang>OK</lang>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- 转账 失败  -->
        <div class="pop pop-reg-failure" :class="{'hide':!showTransferError}">
            <div class="pop-body">
                <div class="pop-ani">
                    <div class="pop-main">
                        <a href="javascript:;" class="btn-close" @click="showTransferError=false">close</a>
                        <h3>
                            <lang>Transfer Failure</lang>
                        </h3>
                        <div class="icon-face on">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                                <circle cx="20.5" cy="23.5" r="3.5" fill="#fc5c65"></circle>
                                <circle cx="43.5" cy="23.5" r="3.5" fill="#fc5c65"></circle>
                                <path class="mouth" d="M18 40 C28,30 33,30 46,40" stroke="#fc5c65" fill="none"
                                      style="stroke-width: 4px;"></path>
                                <path class="cheek" d="M58 47  A 30 30 0 1 0 50 56" fill="none" stroke="#fc5c65"
                                      style="stroke-width: 4px;"></path>
                            </svg>
                        </div>
                        <p>{{ transferMsg || _('Transfer Failure') }}</p>
                        <a href="javascript:;" @click="closeTransferError" class="btn-failure">
                            <lang>Try Later</lang>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        tipsTime,
        formatTime,
        ethUrl,
        formateBalance,
        formateCoinType
    } from '~common/util'

    import PopList from '~components/Pop-list'
    import md5 from 'md5'

    import {Message} from 'element-ui'
    export default {
        data () {
            return {
                ShowMarkView: false,
                showTransferSucc: false,
                showTransferError: false,
                transferMsg: '* *',

                withdrawAmount: '', // 提款金额
                withdrawAddr: '', // 提款地址
                withdrawPsw: '', // 提款密码

                showTransfer: false, // 转账弹窗

                pageno: 1,
                pageSize: 10,
                PageTotal: 10,
                orderList: [],
                h5pageno: 1,
                isShowMoreBtn: true,
                h5orderList: [],
                ethUrl,
                activeName: 'Request',
                h5activeName: 'Request',
                withdrawOptionVal: '1',
                withdrawOptions: [
                    {
                        value: '1',
                        label: _('All')
                    },
                    {
                        value: '4',
                        label: _('successful')
                    },
                    {
                        value: '-1',
                        label: _('failed')
                    },
                    {
                        value: '0',
                        label: _('waiting ')
                    }
                ],

                withdrawTimeOptionVal: '1',
                withdrawTimeOptions: [
                    {
                        value: '1',
                        label: _('In 30 days')
                    },
                    {
                        value: '2',
                        label: _('In 7 days')
                    }
                ],

                ethOptions: [
                    {
                        value: '1',
                        label: _('All')
                    },
                    {
                        value: '1001',
                        label: _('BTC')
                    },
                    {
                        value: '2001',
                        label: _('ETH')
                    }
                ],
                ethOptionVal: '1',
                tranOptionVal: null
            }
        },
        methods: {
            formateBalance,
            formateCoinType,
            withdrawSizeChange (size) {
                this.pageSize = size
                this.handleCurrentChange()
            },
            checkAddrLen () {
                if (this.withdrawAddr.length >= 50) {
                    this.withdrawAddr = this.withdrawAddr.slice(0, 50)
                }
            },
            changeCoin (val) {
                if (val) {
                    this.tranOptionVal = this.formateCoinType(val.cointype)
                    this.$store.commit('setCurrBalance', val)
                }
            },
            handleStatusChange () {
                this.pageno = 1
                this.handleCurrentChange()
                /* 清空对应的数据 */
                this.withdrawAddr = ''
                this.withdrawAmount = ''
                this.withdrawPsw = ''

                this.h5pageno = 1
                this.h5orderList = []
            },
            closeTransferError () {
                this.showTransferError = false
                this.withdrawAmount = ''
                this.withdrawPsw = ''
            },
            closeTransferSucc () {
                this.showTransferSucc = false
                this.withdrawAmount = ''
                this.withdrawPsw = ''
            },
            async upWithdraw () {
                // 提款申请
                let params = {
                    address: this.withdrawAddr,
                    value: this.withdrawAmount,
                    password: md5(md5(this.withdrawPsw)),
                    gas: this.currBalance.fee,
                    cointype: this.currBalance.cointype,
                    withdrawFrom: 'coinsprize_1105'
                }
                this.$store.dispatch('cs_account/getWithdrawApply', params).then(data => {
                    this.$store.dispatch('getUserInfo')
                    data = data.data
                    if (data.drawid) {
                        this.showTransferSucc = true
                    } else {
                        this.error(_('Failed to withdraw, please retry'))
                    }
                }).catch(data => {
                    this.showTransferError = true
                    this.transferMsg = data.message
                })
                this.showTransfer = false
            },
            checkMaximum () {
                if (this.currBalance && this.currBalance.balance) {
                    if (Number(this.currBalance.balance) < parseFloat(this.currBalance.draw_limit)) {
                        this.error(_('The minimum withdrawal is') + this.currBalance.draw_limit + formateCoinType(this.currBalance.cointype))
                        return false
                    }
                    this.withdrawAmount = formateBalance(parseFloat(this.currBalance.balance) - parseFloat(this.currBalance.fee))
                }
            },
            copySucc () {
                this.success(_('Copied to clipboard'))
            },
            copyError () {
                this.success(_('Failed to copy, please retry'))
            },
            sendDraw () {
                if (this.withdrawAddr === '') {
                    this.error(_('Please enter the correct wallet address'))
                    return false
                }
                switch (this.currBalance.cointype) {
                case '1001':
                    if (!(this.withdrawAddr[0].toString() === '0' || this.withdrawAddr[0].toString() === '1' || this.withdrawAddr[0].toString() === '2')) {
                        this.error(_('Please enter the correct BTC wallet address'))
                        this.withdrawAddr = ''
                        return false
                    } else if (!(this.withdrawAddr.length > 25 && this.withdrawAddr.length <= 35)) {
                        this.error(_('Please enter the correct length wallet address'))
                        this.withdrawAddr = ''
                        return false
                    }
                    ;
                    break
                case '2001':
                    if (!~this.withdrawAddr.indexOf('0x')) {
                        this.error(_('Please enter the correct ETH wallet address'))
                        this.withdrawAddr = ''
                        return false
                    } else if (this.withdrawAddr.length !== 42) {
                        this.error(_('Please enter the correct length wallet address'))
                        this.withdrawAddr = ''
                        return false
                    }
                    ;
                    break
                }
                if (isNaN(Number(this.withdrawAmount))) {
                    this.error(_('Please enter the correct amount'))
                    this.withdrawAmount = ''
                    return false
                }
                if (
                    this.withdrawAmount === '' ||
                    this.withdrawAmount.toString() === '0' ||
                    Number(this.withdrawAmount) < parseFloat(this.currBalance.draw_limit)
                ) {
                    this.error(_('The minimum withdrawal is') + this.currBalance.draw_limit + formateCoinType(this.currBalance.cointype))
                    return false
                }

                if (this.withdrawPsw === '') {
                    this.error(_('Please input wallet password'))
                    return false
                }

                if (this.currBalance) {
                    if (Number(this.withdrawAmount) > (parseFloat(this.currBalance.balance) - parseFloat(this.currBalance.fee))) {
                        if ((parseFloat(this.currBalance.balance) - parseFloat(this.currBalance.fee)) >= parseFloat(this.currBalance.draw_limit)) {
                            this.withdrawAmount = parseFloat(this.currBalance.balance) - parseFloat(this.currBalance.fee)
                            this.error(_(
                                'The maximum withdrawal is {0} {1}',
                                this.withdrawAmount,
                                this.formateCoinType(this.currBalance.cointype)
                            )
                            )
                        } else {
                            this.error(_('The minimum withdrawal is') + this.currBalance.draw_limit + formateCoinType(this.currBalance.cointype))
                            this.withdrawAmount = ''
                        }
                        return false
                    }
                }
                //  显示弹窗
                this.showTransfer = true
            },
            async handleClick (tab, msg) {
                if (tab.label === _('Records')) {
                    this.handleCurrentChange()
                }
            },
            async handleCurrentChange (val = this.pageno) {
                let params = {}
                if (this.withdrawOptionVal !== '1') {
                    params.drawstatus = this.withdrawOptionVal
                }
                if (this.ethOptionVal !== '1') {
                    params.cointype = this.ethOptionVal
                }
                let data = await this.$store.dispatch('cs_account/getWithdrawRecords',
                    {
                        pageno: val,
                        pagesize: this.pageSize,
                        crday: this.withdrawTimeOptionVal === '1' ? 30 : 7,
                        ...params
                    }
                )
                data = data.data
                if (data) {
                    this.orderList = this.formatWithdrawList(data.list)
                    this.PageTotal = Number(data.counter)

                    this.h5orderList = this.h5orderList.concat(this.orderList)
                    if (data.list.length == 0 || data.list.length != 10) {
                        this.isShowMoreBtn = false
                    }
                }
            },
            /*
            *  格式化orderList 数据
            *  return 格式化后的数据
            * */
            formatWithdrawList (Msg) {
                if (Msg) {
                    Msg.forEach((val, index) => {
                        // bettime
                        val.drawtime = formatTime(val.drawtime, 'yyyy-MM-dd HH:mm')
                        if (val.to_addr !== undefined && val.to_addr !== null) {
                            if (val.to_addr === '') {
                                val.to_addrHtml = '<span>-</span>'
                            } else {
                                val.to_addrHtml = `<a target="_blank" title="${val.to_addr}" href="${ethUrl + 'address/' + val.to_addr}" class="address">${val.to_addr}</a>`
                            }
                        }
                        val.cointype = formateCoinType(val.cointype)
                        val.drawmoney = formateBalance(val.drawmoney)
                        val.drawfee = formateBalance(val.drawfee)

                        if (val.drawstatus !== undefined) {
                            switch (Number(val.drawstatus)) {
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                                val.drawstatus = _('waiting ')
                                break
                            case 4:
                                val.drawstatus = _('successful')
                                break
                            case -1:
                            case -2:
                                val.drawstatus = _('failed')
                                break
                            }
                        }
                        val.balance = formateBalance(val.balance) + formateCoinType(val.cointype)
                        // win state
                        if (val.orderstatus === '2') {
                            // 结算 并且大于0
                            if (Number(val.betprize) > 0) {
                                val.betprizeVal = "<a href='javascript:;' class='win'>+ " + formateBalance(val.betprize) + ' ' + formateCoinType(val.cointype) + '</a>'
                            } else {
                                val.betprizeVal = "<a href='javascript:;' class='fail'>0</a>"
                            }
                        } else {
                            if (Number(val.orderstatus) === 0) {
                                val.betprizeVal = `<a href='javascript:;' class='waiting'>${_('waiting ')}</a>`
                            } else if (val.orderstatus === '1') {
                                val.betprizeVal = `<a href='javascript:;' class='waiting'>${_('waiting ')}</a>`
                            } else if (val.orderstatus === '-1' || val.orderstatus === '-2') {
                                val.betprizeVal = _('failure')
                            }
                        }
                    })
                    return Msg
                }
            },
            error (message) {
                Message({
                    message: message,
                    type: 'error',
                    duration: tipsTime
                })
            },
            success (message) {
                Message({
                    message: message,
                    type: 'success'
                })
            }
        },
        computed: {
            userInfo () {
                return this.$store.state.userInfo
            },
            currBalance () {
                return this.$store.state.currBalance
            }
        },
        watch: {
            currBalance (val) {
                this.tranOptionVal = this.formateCoinType(val.cointype)
            }
        },
        components: {
            PopList
        },
        async mounted () {
            this.handleCurrentChange()
            this.tranOptionVal = this.formateCoinType(this.currBalance.cointype)
        }
    }
</script>
<style lang="less" type="text/less">
    .account {
        .my-info {
            .el-tabs__content {
                overflow: visible;
            }
        }
    }
    .h5-withdrawal{
        .div-request{
            .cs-select{
                display: flex;
                justify-content: space-around;
                margin: 26px percentage(20/710) 0;
                .el-select{
                    margin: 0 2%;
                    .el-input__inner{
                        box-sizing: border-box;
                        width: 100%;
                        font-size: 14px;
                    }
                    .el-input{
                        .el-select__caret{
                            right: 5px;
                        }
                    }
                }
            }
        }
    }
</style>

<style scoped lang="less" type="text/less">
    @import "../../styles/lib-mixins.less";
    .orange {
        color: #fd9644;
    }
    .withdrawal {
        position: relative;
        h2 {
            line-height: 30px;
            font-size: 26px;
            color: #263648;
            text-transform: capitalize;
        }
        .wallet-add{
            position: relative;
            height: 40px;
            line-height: 40px;
            margin-bottom: 30px;
            font-size: 14px;
        .clearfix();
        .wallet_warn{
            position: absolute;
            top: 32px;
            left: 162px;
            font-size: 12px;
            color: #f27d1f;
        }
    }
    .withdraw {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 14px;
    }
    .lf130 {
        width: 130px;
        margin-right: 35px;
        float: left;
        overflow: hidden;
    }
    .fl210 {
        position: relative;
        float: left;
        width: 133px;
        height: 40px;
        padding-right: 20px;
        overflow: hidden;
        text-align: right;
    }

    .li-records {
    .item {
        position: relative;
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        margin-bottom: 30px;
        font-size: 14px;
        .clearfix();
    }
    > li {
        display: none;
    }
    > li.on {
        display: block;
    }
    .chose-coin {
        height: 25px;
        line-height: 25px;
        margin: 25px 0 30px 0;
        overflow: visible;
    .fl210 {
        height: 25px;
        line-height: 25px;
    }
    p {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .icon-mark {
        position: relative;
        display: block;
        width: 16px;
        height: 16px;
        background: url('../../assets/img/icon-mark.png') no-repeat center;
        background-size: 16px;
        cursor: pointer;
        margin-left: 6px;
    }
    .mark-view {
        display: none;
        position: absolute;
        left: 50%;
        top: -10px;
        transform: translate(-50%, -100%);
        z-index: 3;
        background: #ffedbe;
        width: 230px;
        padding: 7px 10px;
        font-size: 12px;
        line-height: 15px;
        color: #000000;
    &::after {
         position: absolute;
         left: 50%;
         bottom: -7px;
         margin-left: -7px;
         content: '';
         display: block;
         width: 0;
         height: 0;
         border-bottom: 0;
         border-left: 7px solid #fff;
         border-top: 7px solid #ffedbe;
         border-right: 7px solid #fff;
     }
    &.on {
         display: block;
     }
    }
    }
    input {
        height: 38px;
        line-height: 38px;
        border: 1px solid #ced6e0;
        outline: none;
        text-indent: 5px;
        width: 455px;
        font-size: 16px;
    }
    .account-psw {
        margin-bottom: 0;
    input {
        width: 275px;
    }
    }
    .pick-up {
    .css_withdraw_tips {
        display: block;
        height: 16px;
        line-height: 16px;
        position: absolute;
        right: 20px;
        top: 6px;
    }
    .css_withdraw_total {
        position: absolute;
        top: 24px;
        right: 20px;
        line-height: 12px;
        font-size: 12px;
    }
    .css_withdraw_topMoney {
        position: absolute;
        right: 330px;
        cursor: pointer;
        color: #6a89cc;
    }
    }
    .pickup-tips {
        position: absolute;
        top: 8px;
        left: 677px;
        height: 36px;
        overflow: hidden;
        line-height: 18px;
        font-size: 14px;
        color: #fc5c65;
        text-transform: capitalize;
    }
    .fee {
        margin-left: 153px;
        height: 36px;
        line-height: 22px;
        font-size: 14px;
        color: #a5b1c2;
    i {
        color: #263648;
    }
    }
    button {
        display: block;
        width: 280px;
        height: 50px;
        line-height: 50px;
        overflow: hidden;
        margin: 0 0 30px 153px;
        background: #fd9644;
        border-radius: 6px;
        font-size: 20px;
        color: #fff;
        font-weight: bold;
    .transition();
    &:hover {
         background: #f27d1f;
     }
    }
    }
    }
    .pagination {
        display: table;
        margin: 20px auto 30px;
    }
    .el-tabs {
        margin-top: 30px;
    }
    .el-tabs__item {
        float: left;
        line-height: 40px;
        font-size: 120px;
        color: #6a89cc;
        padding: 0 20px;
        height: auto;
    }


    .h5-withdrawal{
        .tab{
            ul{
                overflow: hidden;
            }
            li{
                float: left;
                box-sizing: border-box;
                width: 50%;
                height: 80/2px;
                line-height: 80/2px;
                text-align: center;
                font-size: 16px;
                border-bottom: 1px solid #f2f2f2;
                background: #f7f9fe;
                cursor: pointer;
                transition: all 0.2s;
                color: #6a89cc;
                &.on{
                    background: #fff;
                    border-top: 2px solid #263648;
                    border-bottom-color: #fff;
                    color: #263648;
                }
            }
        }
        .div-records{
            position: relative;
            padding: 62/2px percentage(20/710) 25px;
            background: #fff;
            .btn-tohelp{
                position: absolute;
                z-index: 2;
                right: 2.8%;
                top: 8px;
                display: block;
                width: 34/2px;
                height: 34/2px;
                overflow: hidden;
                padding: 10px 0 10px 10px;
                background: url("../../assets/img/icon-mark.png") no-repeat right center;
                background-size: 34/2px;
            }
            .chose-coin{
                position: relative;
                .tips{
                    position: absolute;
                    left: 0;
                    top: 0;
                    line-height: 25px;
                    font-size: 12px;
                }
                .el-select{
                    display: table;
                    float: none;
                    margin: 0 auto;
                }
                p{
                    text-align: center;
                    line-height: 72/2px;
                    font-size: 28/2px;
                    color: #778ca3;
                    i{
                        color: #263648;
                    }
                }
            }
            .item{
                margin-top: 10px;
                .tips{
                    display: flex;
                    justify-content: space-between;
                    line-height: 52/2px;
                    font-size: 14px;
                }
                input{
                    width: 100%;
                    height: 82/2px;
                    line-height: 82/2px;
                    text-indent: 10px;
                    outline: none;
                    background: #f7f9fe;
                    border: 1px solid #d5d5d5;
                    border-radius: 6px;
                    font-size: 16px;
                }
            }
            button{
                margin-top: 30px;
                background: #fd9644;
                width: 100%;
                color: #fff;
                line-height: 90/2px;
                font-size: 16px;
                font-weight: bold;
                border-radius: 6px;
            }
        }
        .div-request{
            padding:0 0 30/2px;
            li{
                padding: 16px 0 20px 0;
                .item-re{
                    display: flex;
                    justify-content: space-between;
                    margin: 0 percentage(35/710);
                    &.item-re1{
                        line-height: 62/2px;
                        font-size: 14px;
                        color: #778ca3;
                    }
                    &.item-re2{
                        line-height: 68/2px;
                        font-size: 16px;
                        a{
                            display: block;
                            width: percentage(220/650);
                            color: #263648;
                            text-decoration: underline;
                            .text-overflow();
                        }
                    }
                }
                &+li{
                    border-top: 1px solid #f2f2f2;
                }
            }
        }
    }
</style>
