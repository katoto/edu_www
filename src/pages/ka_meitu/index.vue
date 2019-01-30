<template>
    <div>
        <div class="containbox">
            <div class="container navHead">
                <h1>超级美图</h1>
                <span class="visible-pc">每日热点美图</span>
            </div>
        </div>
		<div class="container">
		<div class="list_cont list_cont2 w1180">
            <div class="tab_zt">
                <div class="tab_box">
                    <div class="">
                    	<ul class="clearfix">
							<li>
                                <a href="http://www.win4000.com/mt/lichunai.html">
                                    <img alt="李春嫒图片大全" src="http://pic1.win4000.com/cover/2019-01-29/20190129161251_68099_250_300.jpg" data-original="http://pic1.win4000.com/cover/2019-01-29/20190129161251_68099_250_300.jpg" style="display: inline;">
                                    <p>李春嫒图片大全</p>
                                </a>
                            </li>
							<li>
                                <a href="http://www.win4000.com/mt/linbohong.html">
                                    <img alt="林柏宏图片大全" src="http://pic1.win4000.com/cover/2019-01-29/20190129152708_93956_250_300.jpg" data-original="http://pic1.win4000.com/cover/2019-01-29/20190129152708_93956_250_300.jpg" style="display: inline;">
                                    <p>林柏宏图片大全</p>
                                </a>
                            </li>
							<li>
                                <a href="http://www.win4000.com/mt/xingen.html">
                                    <img alt="邢恩图片大全" src="http://pic1.win4000.com/cover/2019-01-28/20190128154513_58638_250_300.jpg" data-original="http://pic1.win4000.com/cover/2019-01-28/20190128154513_58638_250_300.jpg" style="display: inline;">
                                    <p>邢恩图片大全</p>
                                </a>
                            </li>
							<li>
                                <a href="http://www.win4000.com/mt/guoxiaotin.html">
                                    <img alt="郭晓婷图片大全" src="http://pic1.win4000.com/cover/2019-01-24/20190124114735_78307_250_300.jpg" data-original="http://pic1.win4000.com/cover/2019-01-24/20190124114735_78307_250_300.jpg" style="display: inline;">
                                    <p>郭晓婷图片大全</p>
                                </a>
                            </li>
							<li>
                                <a href="http://www.win4000.com/mt/fangyilun.html">
                                    <img alt="方逸伦图片大全" src="http://pic1.win4000.com/cover/2019-01-24/20190124105645_33273_250_300.jpg" data-original="http://pic1.win4000.com/cover/2019-01-24/20190124105645_33273_250_300.jpg" style="display: inline;">
                                    <p>方逸伦图片大全</p>
                                </a>
                            </li>
							<li>
                                <a href="http://www.win4000.com/mt/qianzhenghao.html">
                                    <img alt="钱正昊图片大全" src="http://pic1.win4000.com/cover/2019-01-21/20190121142312_76438_250_300.jpg" data-original="http://pic1.win4000.com/cover/2019-01-21/20190121142312_76438_250_300.jpg" style="display: inline;">
                                    <p>钱正昊图片大全</p>
                                </a>
                            </li>
                        </ul>
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
            currPage: 1,
            isLoading: false,
            pagesize: 12,
            tuzhai: []
        }
    },
    methods: {
        jump2msg (item) {
            delete item.baseDesc
            delete item._id
            localStorage.setItem('tuzhai', JSON.stringify(item))
            this.$router.push(item.titleLink)
        },
        async initPage () {
            let list = await this.$store.dispatch('getiqiyiInfo')
            if (list && list.status === '100') {
            }
        },
        async pageMsg (pageno = 1) {
            let params = {
                pageno,
                pagesize: this.pagesize
            }
            let data = await this.$store.dispatch('ka_tuzhai/getTuzhailist', params)
            if (data && data.data && data.data.msg) {
                if (data.data.msg.length > 0) {
                    data.data.msg.forEach((item, index) => {
                        if (item) {
                            if (item.img) item.img = '//qingniantuzhai.com' + item.img
                            if (item.titleLink) {
                                item.titleLink = '/tuzhaimsg/' + item.titleLink.replace(/\//g, '$')
                            }
                        }
                    })
                    this.tuzhai = this.tuzhai.concat(data.data.msg)
                    this.isLoading = false
                }
            }
        },
        getScrollTop () {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
            return scrollTop
        },
        scrollGet () {
            let bottomHei = (document.documentElement.offsetHeight - this.getScrollTop() - window.innerHeight) <= 350
            if (!this.isLoading && bottomHei) {
                this.isLoading = true
                this.currPage = this.currPage + 1
                console.log(this.currPage)
                this.pageMsg(this.currPage)
            }
        }
    },
    mounted () {
        this.pageMsg()
        document.addEventListener('scroll', this.scrollGet, true)
    },
    destroyed () {
        window.removeEventListener('scroll', this.scrollGet, true)
    }
}
</script>
<style scoped lang="less" type="text/less">
@import "../../styles/lib-media.less";
.containbox {
  .navHead {
    padding: 20px 0;
    h1 {
      font-size: 26px;
      line-height: 32px;
      text-align: left;
      font-weight: 600;
    }
  }
}
// 美图
.list_cont {
    position: relative;
}
.w1180 {
    width: 1180px;
    margin: 0 auto 20px;
}
/* xs超小屏幕（手机，最大 480） */
@media (max-width: @screen-phone) {
	.containbox {
		border-bottom: 0;
		.navHead {
			padding: 10px 0;
			h1 {
				font-size: 20px;
				line-height: 24px;
				text-align: left;
				font-weight: 600;
			}
		}
	}	
}
</style>

