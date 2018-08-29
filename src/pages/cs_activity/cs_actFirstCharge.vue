<template>
    <section style="heigth:1000px">
        <Header></Header>
        充值送{{ firstChargeMsg }}
        <div class="firstChargeBox" v-if="firstChargeMsg">
            <p class="fir_p" @click="getFirstBtn">{{ firstChargeMsg.activity_status | filterMsg }}</p>
        </div>
    </section>
</template>

<script>
import Header from "~components/Header.vue";
import { Message } from "element-ui";

export default {
  data() {
    return {
      title: ""
    };
  },
  watch: {},
  methods: {
    getFirstBtn() {
      // 0=未参与；1=已参与，未充值；2=已充值；-1=不符合活动参与条件
      // 登陆判断
      if (!this.isLog) {
        this.$store.commit("showLoginPop");
      }
      if (this.firstChargeMsg) {
        switch (this.firstChargeMsg.activity_status.toString()) {
          case "0":
            this.getChance();
            break;
            case "1":
            console.log(123)
            this.$router.push("account/deposit");
            break;
          case "-1":
            alert("您不符合活动资格");
            break;
          case "2":
            break;
        }
      }
    },
    async getChance() {
      let msg = await this.$store.dispatch("cs_activity/getChance");
      if (msg.state === "100") {
        Message({
          message: "已领取资格",
          type: "success"
        });
        this.$store.dispatch("cs_activity/getChargeState");
      }
    }
  },
  computed: {
    firstChargeMsg() {
      return this.$store.state.cs_activity.firstCharge;
    },
    isLog() {
      return this.$store.state.isLog;
    }
  },
  components: {
    Header
  },
  mounted() {
    Message({
      message: "msg",
      type: "success"
    });
  },
  filters: {
    filterMsg(state) {
      // 0=未参与；1=已参与，未充值；2=已充值；-1=不符合活动参与条件
      state = state.toString();
      switch (state) {
        case "0":
        case "-1":
          return "领取活动资格";
        case "1":
          return "前往充值";
        case "2":
          return "您已参与此活动";
          break;
      }
    }
  }
};
</script>
<style scoped lang="less" type="text/less">
.firstChargeBox {
  .fir_p {
    cursor: pointer;
  }
}
</style>
