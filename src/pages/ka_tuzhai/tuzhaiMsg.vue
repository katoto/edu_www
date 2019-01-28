<template>
	<div class="row" v-if="tuzhaimsg">
		<div class="article col-xs-12 col-sm-8 col-md-8">
			<div class="post-timthumb" style="background-image: url(/content/images/2019/01/123_----5.jpg);">
				<h1>
					青年图摘0126!一望十五年
				</h1>
			</div>
			<div class="post">
				<div class="post-title">
					<div class="post-entry-categories">
					</div>
					<div class="post_icon">
						<span class="postauthor">
							<img alt="" src="/content/images/2018/02/1-140Z6094207.jpg" data-original="/content/images/2018/02/1-140Z6094207.jpg" class="avatar avatar-96 photo" height="96" width="96" style="display: inline-block;">
								<a href="javascript:;">Chris</a>
						</span>
						<span class="postclock">
							<i class="icon-clock-1"></i> 2019-01-26
						</span>
						<span class="posteye">
							<i class="icon-eye-4"></i> 12,627
						</span>
					</div>
				</div>
				<!-- 主题内容 -->
				<div class="post-content" >
				</div>
				<div class="post-declare">
					<p>
						原创文章，作者：<a href="javascript:;">Chris</a>，
						青年图摘0126!一望十五年 <a href="https://qingniantuzhai.com/qing-nian-tu-zhai-0126/">https://qingniantuzhai.com/qing-nian-tu-zhai-0126/</a>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
    data () {
        return {
            tuzhaimsg: null,
            currid: null,
            storetuzhai: null
        }
    },
    methods: {
        async pageMsg (id = '/qing-nian-tu-zhai-0103-2/') {
            let data = await this.$store.dispatch('ka_tuzhai/getTuzhaimsg', id)
            if (data && data.data && data.data.msg) {
                this.tuzhaimsg = data.data.msg
            }
        }
    },
    mounted () {
        if (localStorage.getItem) {
            this.storetuzhai = JSON.parse(localStorage.getItem)
        }
        if (this.$route.params && this.$route.params.tuzhaiid) {
            this.currid = this.$route.params.tuzhaiid.replace(/\$/g, '/')
        }
        console.log(this.currid)
        console.log('======')
        console.log(this.storetuzhai)
        this.pageMsg(this.currid)
    },
    destroyed () {
    }
}
</script>
<style scoped lang="less" type="text/less">
@import "../../styles/lib-media.less";

a{
	color: #48494d;
    text-decoration: none;
    -webkit-transition: all .3s ease;
    -moz-transition: all .3s ease;
    -ms-transition: all .3s ease;
    -o-transition: all .3s ease;
    transition: all .3s ease;
    cursor: pointer;
}
/* xs超小屏幕（手机，最大 480） */
@media (max-width: @screen-phone) {
	.containbox {

	}	
	.content{

	}
}
</style>

