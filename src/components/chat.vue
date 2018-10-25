<template>

    <div class="page_chat" :class="[isShowChat?'on':'close']">
        <a href="javascript:;" class="enter_chat" @click="controlShowChat">
            <img src="@/assets/img/enter_chat.png" alt="">
        </a>
        <div class="chat_admin" :class="{on:isShowChatAdmin}">
            <a href="javascript:;" class="chat_admin_close" @click="isShowChatAdmin = !isShowChatAdmin"></a>
            <div class="chat_admin_head" v-if="controlRoomMsg">
                <p class="user_emain">
                    {{ controlRoomMsg.content.username }}
                </p>
                <p class="user_id">
                    ID: {{ controlRoomMsg.content.uid }}
                </p>
            </div>
            <div class="chat_admin_body">
                <ul class="choose_ban">
                    <li :class="{'on':ban24}">
                        <input type="checkbox" id="ban24" v-model="ban24" @change="controlSpeak('24')">
                        <label for="ban24">{{ $lang.chat.a1 }}</label>
                        <!-- <label for="ban24" v-else>{{ $lang.chat.a4 }}</label> -->
                    </li>
                    <li :class="{'on':banforever}">
                        <input type="checkbox" id="banforever" v-model="banforever" @change="controlSpeak('-1')">
                        <label for="banforever">{{ $lang.chat.a2 }}</label>
                    </li>
                </ul>
                <div class="chat_admin_msg">
                    <div>
                        <span v-lang="$lang.chat.a13">
                        </span>
                        <a href="javascript:;" class="remove" @click="removeAllMsg" v-lang="$lang.chat.a14">
                        </a>
                    </div>
                    <ul class="admin_msg_items">
                        <li v-for="(item,index) in checkOneMsgArr" :key="index">
                            {{ item.content.msg }}
                            <a href="javascript:;" class="remove" @click="removeCurrMsg(item.content.msg_id)">{{ $lang.chat.a15 }}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="chat_room">
            <div class="chat_room_head">
                <p v-lang="$lang.chat.a16">
                    <!-- ,isShowChatAdmin = false -->
                </p>
                <a href="javascript:;" @click="controlShowChat"></a>
            </div>
            <div class="chat_room_main">
                <!-- admin self  -->
                <ul>
                    <template v-if="userInfo && userInfo.is_im_admin === 'True'">
                        <li v-for="(item,index) in recentChatmsg" :key="index" :class="getUserColor(item.content.uid)" @click="controlRoom(item)">
                            <div :class="{'admin':userInfo && userInfo.is_im_admin === 'True','self': userInfo && item.content.uid === userInfo.uid}">
                                <div class="user_shortName">
                                    {{ item.content.username.slice(0,2).toUpperCase() }}
                                </div>
                                <div class="user_view">
                                    <div class="user_row1">
                                        <p class="user_name">
                                            {{ formateEmail(item.content.username,true) }}
                                        </p>
                                        <span class="user_time">
                                            {{ formatTime(item.content.msg_time, 'HH:mm AMPM') }}
                                        </span>
                                    </div>
                                    <p class="user_msg" v-html="item.content.msg.httpParse()">
                                    </p>
                                </div>
                            </div>
                        </li>
                    </template>
                    <template v-else>
                        <li v-for="(item,index) in recentChatmsg" :key="index" :class="getUserColor(item.content.uid)">
                            <div :class="{'admin':userInfo && userInfo.is_im_admin === 'True','self': userInfo && item.content.uid === userInfo.uid}">
                                <div class="user_shortName">
                                    {{ item.content.username.slice(0,2).toUpperCase() }}
                                </div>
                                <div class="user_view">
                                    <div class="user_row1">
                                        <p class="user_name">
                                            {{ formateEmail(item.content.username,true) }}
                                        </p>
                                        <span class="user_time">
                                            {{ formatTime(item.content.msg_time, 'HH:mm AMPM') }}
                                        </span>
                                    </div>
                                    <p class="user_msg" v-html="item.content.msg.httpParse()">
                                    </p>
                                </div>
                            </div>
                        </li>
                    </template>
                    <li :class="getUserColor" class="self">
                        <div class="user_shortName">
                            DO
                        </div>
                        <div class="user_view">
                            <div class="user_row1">
                                <p class="user_name">
                                    sa....6@gmail.com
                                </p>
                                <span class="user_time">
                                    9:46 PM
                                </span>
                            </div>
                            <p class="user_msg">
                                HELLO, I have some questions, who can
                                help me ?
                            </p>
                        </div>
                    </li>

                </ul>
            </div>
            <div class="chat_room_foot">
                <div class="row0">
                    <p class="system_t">
                        {{$lang.chat.a10}}
                    </p>
                    <p class="system_m">
                        <!-- 永久禁言todo -->
                        {{$lang.chat.a5}}
                    </p>
                    <p class="system_m">
                        <!-- 永久2小时todo  -->
                        {{$lang.chat.a6}}
                    </p>
                </div>
                <div class="row1" :class="{'isOver100':getByteLen(myMsg) > vipChatLen}">
                    <p>{{ getByteLen(myMsg) }}/{{ vipChatLen }}&nbsp;{{$lang.chat.a11}}</p>
                    <i v-if="getByteLen(myMsg)>vipChatLen">!</i>
                </div>
                <div class="row2">
                    <div class="row2_left">
                        <div class="placeholder">
                            {{myMsg}}
                        </div>
                        <textarea @focus="checkUse" v-model="myMsg" @input="myMsgInput" :placeholder="$lang.chat.a12">
                        </textarea>
                    </div>
                    <a href="javascript:;" class="btn_send" @click="sendMsg" :class="{'p_btn_disable':getByteLen(myMsg) > vipChatLen || myMsg === ''}"></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { formatTime, formateEmail, isIOS, getByteLen, cutStr, getCK } from '~common/util'
export default {
    data () {
        return {
            vipChatLen: 100,
            scrollTop: 0,
            isShowChat: false,
            ban24: false,
            banforever: false,
            myMsg: '',
            isShowChatAdmin: false, // admin 页面
            controlRoomMsg: null, // 控制中心数据
            checkOneMsgArr: [], // admin 查询用户列表用
            newMsgArr: []
        }
    },
    watch: {
        isShowChat: function () {
            if (document.documentElement.offsetWidth <= 768) {
                if (this.isShowChat) {
                    // 顺序不能打乱
                    document.getElementById('app').childNodes[0].addEventListener('touchmove', this.banScroll, { passive: false })
                    this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
                    // if (!isIOS) {
                    // 只给安卓加
                    document.querySelector('body').className = 'noscroll'
                    // }
                } else {
                    document.querySelector('body').setAttribute('class', '')
                    document.scrollingElement.scrollTop = this.scrollTop
                    document.getElementById('app').childNodes[0].removeEventListener('touchmove', this.banScroll, { passive: false })
                }
            }
        },
        chatmsg (data) {
            if (data.content.uid === this.userInfo.uid) {
                this.myMsg = ''
            }
            document.querySelector('.chat_room .chat_room_main').scrollTop = document.querySelector('.chat_room .chat_room_main ul').offsetHeight
        }
    },
    methods: {
        formateEmail,
        getByteLen,
        cutStr,
        formatTime,
        sendMsg () {
            // 发送msg
            this.checkUse()
            if (this.getByteLen(this.myMsg) > this.vipChatLen || this.getByteLen(this.myMsg) <= 0) {
                return false
            }
            let currObj = {
                action: 'chatroom_send',
                type: 'im',
                chatroom_id: '1',
                uid: this.userInfo.uid,
                username: this.userInfo.username,
                ck: getCK(),
                msg_type: 'betblock.im.message.text',
                msg: this.myMsg
            }
            this.$store.dispatch('sendchatMsg', currObj)
        },
        controlShowChat () {
            if (this.isShowChat) {
                this.$store.dispatch('subOutMsg', { type: 'im', chatroomId: '1' })
            } else {
                this.$store.dispatch('subInMsg', { type: 'im', chatroomId: '1' })
                // 默认到最底部
                setTimeout(() => {
                    document.querySelector('.chat_room .chat_room_main').scrollTop = document.querySelector('.chat_room .chat_room_main ul').offsetHeight
                }, 10)
            }
            this.isShowChat = !this.isShowChat
        },
        myMsgInput () {
            if (this.getByteLen(this.myMsg) > this.vipChatLen) {
                this.myMsg = this.cutStr(this.myMsg, this.vipChatLen + 1)
            }
        },
        controlSpeak (val = '24') {
            let confirmMsg = ''
            if (val === '24') {
                confirmMsg = this.ban24 ? '确定禁言24小时？' : '解除禁言24小时？'
            } else {
                confirmMsg = this.banforever ? '确定永久禁言？' : '解除永久禁言？'
            }
            let isconfirm = confirm(confirmMsg)
            if (!isconfirm) return false
            if (val === '24') {
                this.ban24 ? this.noSpeak('24') : this.breakSpeak('24')
            } else {
                this.banforever ? this.noSpeak('-1') : this.breakSpeak('-1')
            }
        },
        async noSpeak (val) {
            // 禁言  24 or 永久
            let currObj = {
                block_uid: this.controlRoomMsg.content.uid,
                block_type: val === '-1' ? 'permanent' : '24h',
                chatroom_id: '1'
            }
            let data = await this.$store.dispatch('noSpeak', currObj)
            if (data && data.status === '100') {
                this.$success(_('禁言操作成功'))
                // 更新数据
                this.controlRoom(this.controlRoomMsg)
            }
        },
        async breakSpeak (val) {
            // 解除禁言
            let currObj = {
                block_uid: this.controlRoomMsg.content.uid,
                block_type: val === '-1' ? 'permanent' : '24h'
            }
            let data = await this.$store.dispatch('breakSpeak', currObj)
            if (data && data.status === '100') {
                this.$success(_('解除禁言操作成功'))
                // 更新数据
                this.controlRoom(this.controlRoomMsg)
            }
        },
        async removeAllMsg (msgIdArr) {
            // 删除指定msg
            let data = await this.$store.dispatch('delAllMsg', msgId)
        },
        async removeCurrMsg (msgId) {
            // 删除指定msg
            let data = await this.$store.dispatch('delCurrMsg', msgId)
        },
        async controlRoom (item) {
            this.controlRoomMsg = item
            // 0 -1 1  24 永久 无
            // 请求用户信息 列表 removeAll 会用到
            let sendObj = {
                check_uid: item.content.uid,
                chatroom_id: '1'
            }
            let msgback = await this.$store.dispatch('getOneChatmsg', sendObj)
            if (msgback.data) {
                // null 是无禁言状态
                this.ban24 = msgback.data.block_24h !== null
                this.banforever = msgback.data.block_permanent === 'True'
                this.isShowChatAdmin = true
                this.checkOneMsgArr = msgback.data.recent_message
            }
            console.log(msgback)
        },
        banScroll (evt) {
            evt.preventDefault()
        },
        checkUse (evt) {
            if (!this.userInfo || Object.keys(this.userInfo).length === 0 || this.userInfo.status === '0') {
                this.$store.commit('showLoginPop')
                evt.target.blur()
            }
        },
        getUserColor (ind) {
            // return 'userColor' + (~~(Math.random() * 12) + 1)
            // return 'userColor' + ind % 13
            return 'userColor' + ind % 13
        }
    },
    computed: {
        userInfo () {
            if (this.$store.state.userInfo) {
                this.vipChatLen = this.$store.state.userInfo.is_recharged_user === 'True' ? 200 : 100
            }
            return this.$store.state.userInfo
        },
        recentChatmsg () {
            return this.$store.state.pop.recentChatmsg
        },
        chatmsg () {
            return this.$store.state.pop.chatmsg
        }
    },
    components: {},
    mounted () {
    },
    destroyed () {

    }
}
</script>
<style scoped lang="less" type="text/less">
@media (min-width: 769px) {
  .page_chat {
    position: fixed;
    bottom: 20px;
    right: 20px;
    overflow: hidden;
    z-index: 11;
    .remove {
      font-size: 12px;
      color: #f91f1f;
      &:hover {
        filter: brightness(1.1);
      }
    }
    * {
      box-sizing: border-box;
    }
    .enter_chat {
      display: block;
      width: 62px;
      height: 62px;
      overflow: hidden;
      transition: all 0.2s;
      &:hover {
        filter: brightness(1.1);
      }
    }
    &.on {
      display: flex;
      align-items: flex-end;
      height: 686px;
      .enter_chat {
        transform: scale(0);
      }
    }
    &.close {
      width: 62px;
      height: 62px;
      .chat_admin,
      .chat_room {
        width: 0;
      }
    }
    .chat_admin {
      display: flex;
      flex-direction: column;
      position: relative;
      width: 0;
      height: 644px;
      margin-right: 10px;
      background: #d2d2d2;
      border-radius: 6px;
      overflow: hidden;
      color: #292a2f;
      transform: translateX(150%);
      transition: all 0.5s ease-in-out;
      &.on {
        width: 302px;
        transform: translateX(0);
      }
    }
    .chat_admin_close {
      position: absolute;
      top: 0;
      right: 0;
      width: 34px;
      height: 34px;
      background: url(../assets/img/icon-close.png) no-repeat center;
      &:hover {
        filter: brightness(1.1);
      }
    }
    .chat_admin_head {
      height: 80px;
      padding: 27px 0 0 20px;
      background: #c96e6f;
      color: #fff;
    }
    .user_emain {
      line-height: 23px;
      font-size: 16px;
    }
    .user_id {
      line-height: 20px;
      font-size: 12px;
    }
    .chat_admin_body {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .choose_ban {
      margin: 5px 0 5px 20px;
      font-size: 14px;
      color: #292a2f;
      font-weight: bold;
      li {
        height: 30px;
        line-height: 30px;
        label {
          cursor: pointer;
        }
        &.on {
          color: #ff0000;
        }
      }
    }
    .chat_admin_msg {
      flex: 1;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 6px;
        background: rgba(120, 140, 163, 0.5);
      }
      &::-webkit-scrollbar-track {
        border-radius: 6px;
        background: #1d1c3a;
      }
      > div {
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        line-height: 28px;
        border-bottom: 1px solid #a4a5a7;
        span {
        }
      }
    }
    .admin_msg_items {
      li {
        padding: 5px 20px;
        line-height: 20px;
        font-size: 14px;
        border-bottom: 1px solid #a4a5a7;
      }
    }

    .chat_room {
      display: flex;
      flex-direction: column;
      width: 386px;
      height: 686px;
      overflow: hidden;
      background: #36393e;
      border-radius: 6px;
      color: #fff;
      transition: all 0.2s ease-in-out;
    }
    .chat_room_head {
      display: flex;
      justify-content: space-between;
      line-height: 42px;
      border-bottom: 1px solid #57595d;
      padding: 0 10px;
      a {
        display: block;
        width: 20px;
        height: 42px;
        background: url(../assets/img/chat_close.png) no-repeat center;
        &:hover {
          filter: brightness(1.5);
        }
      }
    }
    .chat_room_main {
      flex: 1;
      overflow: auto;
      padding: 17px 10px 0;
      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 6px;
        background: rgba(120, 140, 163, 0.5);
      }
      &::-webkit-scrollbar-track {
        border-radius: 6px;
        background: #1d1c3a;
      }
      li {
        &.userColor1 {
          .user_shortName {
            color: #b1484a;
            background: rgba(177, 72, 74, 0.2);
          }
        }
        &.userColor2 {
          .user_shortName {
            color: #b14878;
            background: rgba(177, 72, 120, 0.2);
          }
        }
        &.userColor3 {
          .user_shortName {
            color: #a148b1;
            background: rgba(161, 72, 177, 0.2);
          }
        }
        &.userColor4 {
          .user_shortName {
            color: #a148b1;
            background: rgba(125, 79, 197, 0.2);
          }
        }
        &.userColor5 {
          .user_shortName {
            color: #605ed6;
            background: rgba(96, 94, 214, 0.2);
          }
        }
        &.userColor6 {
          .user_shortName {
            color: #487fb1;
            background: rgba(72, 127, 177, 0.2);
          }
        }
        &.userColor7 {
          .user_shortName {
            color: #3f9da5;
            background: rgba(63, 157, 165, 0.2);
          }
        }
        &.userColor8 {
          .user_shortName {
            color: #48b16b;
            background: rgba(72, 177, 107, 0.2);
          }
        }
        &.userColor9 {
          .user_shortName {
            color: #98b148;
            background: rgba(152, 177, 72, 0.2);
          }
        }
        &.userColor10 {
          .user_shortName {
            color: #b6802b;
            background: rgba(182, 128, 43, 0.2);
          }
        }
        &.userColor11 {
          .user_shortName {
            color: #b16348;
            background: rgba(177, 99, 72, 0.2);
          }
        }
        &.userColor12 {
          .user_shortName {
            color: #90947d;
            background: rgba(144, 148, 125, 0.2);
          }
        }
        &.admin {
          .user_shortName {
            color: #6debd6;
            background: rgba(109, 235, 214, 0.2);
          }
          .user_msg {
            color: #6debd6;
          }
        }
        &.self {
          padding-left: 38px;
          .user_row1 {
            flex-direction: row-reverse;
            * {
              margin: 0 0 0 5px;
            }
          }
          .user_shortName {
            float: right;
            margin: 0 0 0 10px;
          }
          .user_msg {
            margin-top: 4px;
            padding: 3px 10px 2px;
            background: #57595d;
            border-radius: 6px;
          }
        }
        & + li {
          margin-top: 30px;
        }
        a {
          color: #fd9644;
          &:hover {
            filter: brightness(1.2);
            color: #fd9644;
          }
        }
      }
      .user_shortName {
        float: left;
        width: 28px;
        height: 28px;
        overflow: hidden;
        margin-right: 10px;
        border-radius: 50%;
        text-align: center;
        line-height: 28px;
        font-size: 12px;
        font-weight: bold;
      }
      .user_view {
        overflow: hidden;
      }
      .user_row1 {
        display: flex;
        margin: 1px 0 2px 0;
        height: 14px;
        line-height: 14px;
        font-size: 12px;
        * {
          margin-right: 5px;
        }
      }
      .user_name {
        color: #aaabad;
      }
      .user_isAdmin {
        padding: 0 5px;
        line-height: 14px;
        color: #6debd6;
        background: #57595d;
        border-radius: 4px;
      }
      .user_time {
        color: #57595d;
      }
      .user_msg {
        line-height: 20px;
        font-size: 14px;
        color: #fff;
        word-break: break-all;
      }
    }
    .chat_room_foot {
      .row0 {
        margin: 20px 10px 0;
        .system_t {
          line-height: 18px;
          font-size: 12px;
          color: #aaabad;
        }
        .system_m {
          line-height: 20px;
          font-size: 14px;
          color: #ef7e7e;
          word-break: break-all;
        }
      }
      .row1 {
        position: relative;
        margin: 0 10px;
        line-height: 24px;
        font-size: 14px;
        color: #57595d;
        text-align: right;
        &.isOver100 {
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          color: #ef7e7e;
          i {
            display: block;
            background: #ef7e7e;
            width: 12px;
            height: 12px;
            overflow: hidden;
            border-radius: 50%;
            text-align: center;
            line-height: 12px;
            font-size: 12px;
            color: #36393e;
            font-weight: bold;
            margin-right: 10px;
          }
        }
      }
      .row2 {
        display: flex;
        align-items: flex-end;
        justify-content: space-around;
        background: #292a2f;
        overflow: hidden;
        padding: 12px 10px;
      }
      .row2_left {
        flex: 1;
        position: relative;
        min-height: 35px;
      }
      .placeholder {
        display: block;
        visibility: hidden;
        word-wrap: break-word;
        word-break: break-all;
      }
      textarea {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        min-height: 35px;
        padding: 7px 10px;
        line-height: 16px;
        font-size: 14px;
        color: #292a2f;
        outline: none;
        border: none;
        border-radius: 6px;
        overflow: hidden;
        resize: none;
        word-wrap: break-word;
        word-break: break-all;
      }
      .btn_send {
        display: block;
        width: 70px;
        height: 35px;
        overflow: hidden;
        margin-left: 10px;
        background: #fd9644 url(../assets/img/chat_btn.png) no-repeat center;
        background-size: 24px;
        border-radius: 6px;
        overflow: hidden;
        &:hover {
          filter: brightness(1.1);
        }
      }
    }
  }
}
@import "chatH5.less";
</style>
<style lang="less" type="text/less">
@media (max-width: 768px) {
  //只在移动端处理，因为弹窗会挡住页面看不出变化
  .noscroll {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    #app > div:first-child {
    }
  }
  .chat_room_main {
    .link {
      color: #fd9644;
      &:hover {
        filter: brightness(1.2);
        color: #fd9644;
      }
    }
  }
}
</style>
