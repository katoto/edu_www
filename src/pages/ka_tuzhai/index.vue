<template>
    <div>
        <div class="containbox">
            <div class="container navHead">
                <h1>热门图摘</h1>
                <span class="visible-pc">每日热点图摘</span>
            </div>
        </div>
		<div class="container">
			<article class="content" v-for="(item, index) in tuzhai" :key="index">
				<div class="content-box posts-gallery-box">
					<div class="posts-gallery-img">
						<a @click="jump2msg(item)" :title="item.titleName">
							<img class="lazy thumbnail" :src="item.img" :alt="item.titleName" style="display: block;">
						</a>
					</div>
					<div class="posts-gallery-content">
						<h2><a @click="jump2msg(item)" :href="item.titleLink" :title="item.titleName">{{ item.titleName }}</a></h2>
						<div class="posts-gallery-text hidden-xs hidden-sm">
							{{ item.baseDesc }}
						</div>
						<div class="posts-default-info posts-gallery-info">
							<ul>
								<li class="post-author">
									<div class="avatar">
											<img alt="Chris" src="//qingniantuzhai.com/content/images/2018/02/1-140Z6094207.jpg" class="avatar avatar-96 photo" height="96" width="96" style="display: block;">
									</div>
									<a href="javascript:;">{{ item.author }}</a>
								</li>
								<li class="postoriginal hidden-xs hidden-sm">
									<span><i class="icon-cc-1"></i></span>
								</li>
								<li class="ico-time" v-html="item.titletime"></li>
								<li class="ico-eye">
									<i class="icon-comment-4"></i>
									<span class="disqus-comment-count"></span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</article>
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
//   border-bottom: 2px solid #55a5d8;
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
// 图摘样式
.content{
	position: relative;
    overflow: hidden;
    display: block;
    margin-bottom: 25px;
    background: #FFF;
    -webkit-box-shadow: 0 2px 5px 0 rgba(146,146,146,.1);
    -moz-box-shadow: 0 2px 5px 0 rgba(146,146,146,.1);
    box-shadow: 0 2px 5px 0 rgba(146,146,146,.1);
    -webkit-transition: all 0.6s ease;
    -moz-transition: all 0.6s ease;
    -o-transition: all 0.6s ease;
	transition: all 0.6s ease;
	.content-box{
		overflow: hidden;
		padding: 23px 20px;
		.posts-gallery-img{
			position: relative;
			float: left;
			width: 231.98px;
			height: 173.98px;
			overflow: hidden;
			a{
				color: #48494d;
				text-decoration: none;
				-webkit-transition: all .3s ease;
				-moz-transition: all .3s ease;
				-ms-transition: all .3s ease;
				-o-transition: all .3s ease;
				transition: all .3s ease;
				cursor: pointer;
				img{
					width: 100%;
					height: auto;
				}
			}
		}
		.posts-gallery-content{
			margin-left: 250px;
			h2{
				position: relative;
				margin: 0 0 20px 0;
				font-size: 22px;
				line-height: 24px;
				text-overflow: ellipsis;
				-webkit-box-orient: vertical;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
			.posts-gallery-text{
				font-size: 14px;
				line-height: 1.6;
				margin-bottom: 20px;
				color: #566573;
				overflow: hidden;
				text-overflow: ellipsis;
				-webkit-box-orient: vertical;
				display: -webkit-box;
				-webkit-line-clamp: 2;
			}
			.posts-gallery-info{
				position: absolute;
    			bottom: 32px;
			}
			.posts-default-info{
				ul{
					list-style: none;
					margin: 0;
					padding: 0;
					li{
						font-size: 12px;
						letter-spacing: -.2px;
						padding: 0;
						margin: 0 5px 0 0;
						color: #748594;
						position: relative;
						line-height: 1.5;
						display: inline-block;
						a{
							color: #748594;
						}
						&.post-author{
							padding-left: 30px;
						}
						.avatar{
							position: absolute;
							top: -2px;
							left: 0;
							width: 25px;
							img{
								border: 1px solid #e5e5e5;
								border-radius: 50%;
								padding: 1px;
								width: 25px;
								height: 25px;
							}
						}
					}
				}
			}
		}
	}
	&:hover{
		-webkit-box-shadow: 0 2px 5px 0 rgba(146,146,146,.1);
		-moz-box-shadow: 0 2px 5px 0 rgba(146,146,146,.1);
		box-shadow: 0 8px 25px 0 rgba(146,146,146,0.21);
	}
}
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
	.content{
		margin-bottom: 12px;
		.content-box{
			padding: 13px 10px;
			.posts-gallery-img{
				width: 33.3333%;
				height: auto;
				max-height: 89px;
			}
			.posts-gallery-content{
				margin-left: 36%;
				h2{
					font-size: 15px;
					line-height: 1.3;
					font-weight: 700;					
				}
				.posts-gallery-text{
					white-space: normal;
					overflow: hidden;
					text-overflow: ellipsis;
					margin-bottom: 5px;					
				}
				.posts-gallery-info{
					bottom: 15px;
    				position: absolute;
				}
			}
		}
	}
}
</style>

