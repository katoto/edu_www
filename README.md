# baseVueProject  

基础描述整体功能

> 这是一个单页，集成多语言(中文、繁体、English)、SEO（部分静态化）、ElementUI、响应式。基本上能应付常见的站点了

http://cache.video.iqiyi.com/jp/avlist/216274801/1/50/?albumId=216274801&pageNum=50&pageNo=1&callback=aa

## Build Setup
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

```
### sitemap.xml
> 每新增一个页面就对应新增对应的sitemap.xml 文件。
### package.json
- howler 用于多语音断点播放。
- vue-clipboard2  用于复制
- md5  密码加密
- axios  ajax使用
- element-ui  滚动，分页等
- es6-promise  promise 兼容处理
- vue 这个就没啥好说的了
- vue-router  路由
- vuex  store 管理
- vuex-router-sync

### i18n.js && i18n-config.js && plugins > language.vue 
> 这个数对应多语音使用的，最终语言相关的都写在language 目录下。

### prerender-spa-plugin
> 用于渲染出静态页
