<template>
    <div>
        <div class="wrapper-content">
            <div id="widget-tab-0" data-tabname="ablumTab0" data-widget-hoverclick="true" data-album-score="main">
                <div class=" album-head-v2 " id="block-BB" data-lequid="2771" data-asyn-pb="true">
                    <div class="album-head-con">
                        <div class="album-head-info clearfix">
                            <div class="info-img">
                                <a target="_blank" class="al_img" href="http://www.iqiyi.com/v_19rr3vi8ms.html">
                                    <img src="http://pic2.iqiyipic.com/image/20181119/0c/eb/a_100217443_m_601_m1_195_260.jpg" alt="">
                                    <!-- hover添加蒙版和播放按钮 -->
                                </a>
                                <p class="site-piclist_icons-lt">
                                    <img class="icon-viedo-mr" src="http://pic0.iqiyipic.com/common/20171106/ac/1b/vip_100000_v_601_0_20.png">
                                </p>
                            </div>
                            <div class="info-intro">
                                <h1 itemprop="name">
                                    <a class="info-intro-title" title="因为爱你" rseat="708222_biaoti" data-pb="c1=2" data-album-ele="imgBg" target="_blank" href="http://www.iqiyi.com/v_19rr3vi8ms.html">因为爱你</a>
                                    <a target="_blank" href="//www.iqiyi.com/dianshiju/" class="channelTag" data-pb="c1=2" rseat="708222_biaoqian">电视剧</a>
                                    <span class="heat-info"><i class="qy-svgicon qy-svgicon-hot"></i>热度 2375</span>
                                </h1>
                                <div class="intro-effect clearfix" id="movie-score-show">
                                    <span class="effect-score"><i>7</i><i>.5</i><span data-updown-score="txt">分</span></span>
                                </div>
                                <!-- 简介 -->
                                <div class="episodeIntro">
                                    <div class="episodeIntro-item clearfix">
                                        <div class="episodeIntro-line">
                                            <p class="episodeIntro-area">
                                                <em>地区：</em><a href="http://list.iqiyi.com/www/2/15------------------.html" target="_blank">内地</a>
                                            </p>
                                        </div>
                                        <div class="episodeIntro-line">
                                            <p class="episodeIntro-update">
                                                <em>更新时间：</em><span>每周二中午12:00更新4集</span>
                                            </p>

                                        </div>
                                        <div class="episodeIntro-line">
                                            <p class="episodeIntro-type">
                                                <em>类型：</em><a href="http://list.iqiyi.com/www/2/-24063-----------------.html" rseat="708222_leixing" target="_blank">剧情</a> /<a href="http://list.iqiyi.com/www/2/-24064-----------------.html" rseat="708222_leixing" target="_blank">都市</a> /<a href="http://list.iqiyi.com/www/2/-24065-----------------.html" rseat="708222_leixing" target="_blank">网剧</a>
                                            </p>
                                            <p class="episodeIntro-director">
                                                <em>导演：</em>
                                                <a target="_blank" href="//www.iqiyi.com/lib/s_203553305.html" rseat="708222_daoyan" data-pb="2">张林子</a>
                                                <a target="_blank" href="//www.iqiyi.com/lib/s_236832005.html" rseat="708222_daoyan" data-pb="2">吴家立</a>
                                                <a target="_blank" href="//www.iqiyi.com/lib/s_205554205.html" rseat="708222_daoyan" data-pb="2">聂军</a>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="episodeIntro-brief" style="display: block;">
                                        <em>简介：</em>
                                        <span class="briefIntroTxt">苏明明即将和男友吕风结婚，他的前女友袁媛买下二人所在的广告公司，只为抢回吕风。苏明明经不住重重压力，黯然离开。吕风发现自己无法爱上袁媛，再次和与苏明明重逢和好，却又面临袁媛心脏病发的困境。吕风的大学同学郑波拥有漂亮女友童娇娇以及游泳冠军梦想外，一无所有。善良的童娇娇为了帮他完成梦想，辛苦赚钱养家。情路坎坷的老板陈刚为她动心，动用金钱和关系暗中帮助郑波，郑波意外出车祸而冠军梦碎。陈刚遭到前妻报复，变得一无所有，和童娇娇重新开始。刘珂一个默默无闻的音乐才子，王小西则梦想成为大明星。想成名就要付出代价她逐渐学会了同流合污，当她获得想要的金钱和地位后，却发现这并不能让她幸福，可惜她却再也没有机会挽回。</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data () {
        return {
            tvid: null,
            allMsg: null
        }
    },
    methods: {
        async getTvMsg (tvid) {
            let data = await this.$store.dispatch('getiqiyiTvMsg', { tvid })
            if (data) {
                this.allMsg = data.data
            }
        }
    },
    mounted () {
        if (this.$route.params && this.$route.params.tvid) {
            this.tvid = this.$route.params.tvid
            this.getTvMsg(this.tvid)
            console.log(this.$route.params.tvid)
        }
    }
}
</script>
<style scoped  lang="less" type="text/less">
.wrapper-content {
  position: relative;
  .album-head-v2 {
    background-color: #f8f8f8;
    margin-bottom: 28px;
    .album-head-con {
      width: 980px;
      margin: 0 auto;
      .album-head-info {
        position: relative;
        padding: 30px 0;
        .info-img {
          // 图片
          width: 180px;
          height: 240px;
          border: 10px solid #fff;
          float: left;
          margin-right: 20px;
          box-shadow: 0 1px 1px 1px rgba(98, 98, 98, 0.1);
          position: relative;
          .al_img {
            display: block;
            width: 100%;
            img {
              display: block;
              width: 100%;
            }
          }
        }
        .intro-effect {
          position: absolute;
          right: 0;
          top: 3px;
        }
        .info-intro {
          float: left;
          width: 760px;
          position: relative;
          h1 {
            font-size: 26px;
            color: #333;
            line-height: 42px;
            .channelTag {
              padding: 1px 6px;
              border: 1px solid #e4e4e4;
              color: #999;
              font-size: 12px;
              font-weight: normal;
              line-height: 20px;
              vertical-align: 5px;
              background-color: #fff;
            }
            .heat-info {
              font-size: 14px;
              color: #999;
              line-height: 22px;
              vertical-align: 4px;
            }
          }
        }
      }
    }
    .episodeIntro {
      min-height: 101px;
      font-size: 14px;
      .episodeIntro-item {
        margin-bottom: 15px;
      }
      .episodeIntro-line {
        float: left;
        padding-right: 20px;
      }
      em {
        color: #999;
        font-size: 14px;
      }
    }
  }
}
</style>