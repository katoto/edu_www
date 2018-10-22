<template>

    <div class="page_chat " :class="[isShowChat?'on':'close']">
        <a href="javascript:;" class="enter_chat" v-if="!isShowChat" @click="isShowChat = !isShowChat">
            <img src="@/assets/img/enter_chat.png" alt="">
        </a>
        <template v-else>
            <div class="chat_admin" :class="{on:isShowChatAdmin}">
                <a href="javascript:;" class="chat_admin_close" @click="isShowChatAdmin = !isShowChatAdmin"></a>
                <div class="chat_admin_head">
                    <p class="user_emain">
                        Sauwyeye@gmail.com
                    </p>
                    <p class="user_id">
                        ID: 1000394
                    </p>
                </div>
                <div class="chat_admin_body">
                    <ul class="choose_ban">
                        <li :class="{'on':ban24}">
                            <input type="checkbox" id="ban24" v-model="ban24">
                            <label for="ban24">24 hours silence</label>
                        </li>
                        <li :class="{'on':banforever}">
                            <input type="checkbox" id="banforever" v-model="banforever">
                            <label for="banforever">Permanently banned</label>
                        </li>
                    </ul>
                    <div class="chat_admin_msg">
                        <div>
                            <span>
                                Topics
                            </span>
                            <a href="javascript:;" class="remove">
                                Remove All
                            </a>
                        </div>
                        <ul class="admin_msg_items ">
                            <li>
                                system charge : Daniel is permanently banned.Please speak in a civilized manner. <a href="javascript:;" class="remove">Remove All</a>
                            </li>
                            <li>
                                system charge : Daniel is permanently banned.Please speak <a href="javascript:;" class="remove">Remove All</a>
                            </li>
                            <li>
                                fuck all!! <a href="javascript:;" class="remove">Remove All</a>
                            </li>
                            <li>
                                system charge : Daniel is permanently banned.Please speak in a civilized manner. <a href="javascript:;" class="remove">Remove All</a>
                            </li>
                            <li>
                                system charge : Daniel is permanently banned.Please speak <a href="javascript:;" class="remove">Remove All</a>
                            </li>
                            <li>
                                fuck all!! <a href="javascript:;" class="remove">Remove All</a>
                            </li>
                            <li>
                                system charge : Daniel is permanently banned.Please speak in a civilized manner. <a href="javascript:;" class="remove">Remove All</a>
                            </li>
                            <li>
                                system charge : Daniel is permanently banned.Please speak <a href="javascript:;" class="remove">Remove All</a>
                            </li>
                            <li>
                                fuck all!! <a href="javascript:;" class="remove">Remove All</a>
                            </li>
                            <li>
                                system charge : Daniel is permanently banned.Please speak in a civilized manner. <a href="javascript:;" class="remove">Remove All</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="chat_room ">
                <div class="chat_room_head">
                    <p>
                        Chart Room
                    </p>
                    <a href="javascript:;" @click="isShowChat = !isShowChat"></a>
                </div>
                <div class="chat_room_main">
                    <ul>
                        <li :class="[isAdmin?'admin':'']">
                            <div class="user_shortName">
                                DO
                            </div>
                            <div class="user_view">
                                <div class="user_row1">
                                    <p class="user_name">
                                        Dominator
                                    </p>
                                    <span class="user_isAdmin" v-if="isAdmin">
                                        Admin
                                    </span>
                                    <span class="user_time">
                                        9:46 PM
                                    </span>
                                </div>
                                <p class="user_msg">
                                    system charge : Daniel is permanently banned.
                                    Please speak in a civilized manner.
                                </p>
                            </div>
                        </li>
                        <li :class="getUserColor()">
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
                                    this is my money <a href="http://www.coinsprize.com" target="_blank">http://www.coinsprize.com</a>
                                </p>
                            </div>
                        </li>
                        <li :class="getUserColor()" class="self">
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
                        <li :class="getUserColor()">
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
                                    this is my money
                                </p>
                            </div>
                        </li>
                        <li :class="getUserColor()">
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
                                    this is my money
                                </p>
                            </div>
                        </li>
                        <li :class="getUserColor()">
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
                                    this is my money
                                </p>
                            </div>
                        </li>
                        <li :class="getUserColor()">
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
                                    this is my money
                                </p>
                            </div>
                        </li>
                        <li :class="getUserColor()">
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
                                    this is my money
                                </p>
                            </div>
                        </li>
                        <li :class="getUserColor()">
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
                                    this is my money
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="chat_room_foot">
                    <div class="row0">
                        <p class="system_t">
                            system messages
                        </p>
                        <p class="system_m">
                            Message sending failed, you are currently banned, 23 hours remaining
                        </p>
                    </div>
                    <div class="row1" :class="{'isOver100':isOver100}">
                        <p>Maximum input 0/100</p>
                        <i v-if="isOver100">!</i>
                    </div>
                    <div class="row2">
                        <div class="row2_left">
                            <div class="placeholder">
                                {{myMsg}}
                            </div>
                            <textarea @focus="checkUse" v-model="myMsg" placeholder="Say something...">

                        </textarea>
                        </div>
                        <a href="javascript:;" class="btn_send"></a>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    data () {
        return {
            scrollTop: 0,
            isShowChat: false,
            isShowChatAdmin: true,
            ban24: false,
            banforever: false,
            isAdmin: true,
            myMsg: '',
            isOver100: true
        }
    },
    watch: {

    },
    methods: {
        checkUse (evt) {
            if (!this.userInfo || Object.keys(this.userInfo).length === 0 || this.userInfo.status === '0') {
                this.$store.commit('showLoginPop')
                evt.target.blur()
            }
        },
        getUserColor () {
            return 'userColor' + (~~(Math.random() * 12) + 1)
        }
    },
    computed: {
        userInfo () {
            return this.$store.state.userInfo
        }
    },
    components: {},
    mounted () {

    },
    destroyed () {

    }
}
</script>
<style scoped lang="less">
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
    cursor: pointer;
    &:hover {
      filter: brightness(1.1);
    }
    .chat_admin,
    .chat_room {
      display: none;
    }
  }
  &.on {
    display: flex;
    align-items: flex-end;
    height: 686px;
  }
  .chat_admin {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 302px;
    height: 644px;
    margin-right: 10px;
    background: #d2d2d2;
    border-radius: 6px;
    overflow: hidden;
    color: #292a2f;
    transform: translateY(150%);
    transition: all 0.5s ease-in-out;
    &.on {
      transform: translateY(0);
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
    border-radius: 16px;
    color: #fff;
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
      border-radius: 6px;
      overflow: hidden;
    }
  }
}
</style>
