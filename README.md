# baseVueProject

基础描述整体功能(完成webpack4 babel7 的升级)

> 这是一个单页，集成多语言(中文、繁体、English)、SEO（部分静态化）、ElementUI、响应式。基本上能应付常见的站点了

http://cache.video.iqiyi.com/jp/avlist/216274801/1/50/?albumId=216274801&pageNum=50&pageNo=1&callback=aa

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:9999
npm run dev

# build for production with minification
npm run build

```

### sitemap.xml

> 每新增一个页面就对应新增对应的 sitemap.xml 文件，用于seo的爬虫引导。

### package.json

- howler 用于多语音断点播放。
- vue-clipboard2 用于复制
- md5 密码加密
- axios ajax 使用
- element-ui 滚动，分页等
- es6-promise promise 兼容处理
- vue 这个就没啥好说的了
- vue-router 路由
- vuex store 管理
- vuex-router-sync

### i18n.js && i18n-config.js && plugins > language.vue

> 这个数对应多语音使用的，最终语言相关的都写在 language 目录下。

### prerender-spa-plugin

> 用于渲染出静态页，谷歌无界面浏览器

### 如何快速个人新增文章

1、在 edu_www 的 edumsg 页上编辑文章

```
<div class="air_con f-f0">
// 文章内容
</div>
```

2、在 edu_page 出将文件写入到 mongodb
3、将每日推荐中的其中一条写死那个 id

### 升级 webpack4 & babel7

旧打包时间和文件大小，总体时间74s。

- 升级 webpack、webpack-cli、webpack-dev-server 依赖包

- extract-text-webpack-plugin 已废除 使用 mini-css-extract-plugin 替换
  - 修改 utils 下的 generateLoaders 函数

```
function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
    if (loader) {
        loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
            sourceMap: options.sourceMap
        })
        })
    }
    return [options.extract ?
        MiniCssExtractPlugin.loader :
        'vue-style-loader'
        ].concat(loaders)
}
```

- Cannot find module '@webassemblyjs/helper-code-frame' 提示cannot find module。安装有问题，重新删除node_module，然后重新安装。
- webpack.optimize.CommonsChunkPlugin error [split-chunks-plugin](https://webpack.docschina.org/plugins/split-chunks-plugin/)

```
module.exports = {
  //...
optimization: {
    splitChunks: {
        chunks: 'async',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
        },
        default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
        }
        }
    }
}
}


```

+ 移除UglifyJsPlugin
+ NoEmitOnErrorsPlugin 废弃，由 optimization.noEmitOnErrors 替代，生产环境默认开启。
+ NamedModulesPlugin 废弃，由 optimization.namedModules 替代，生产环境默认开启。

## 升级babel 7
+ 安装babel-loader 、@babel/core、@babel/plugin-transform-runtime、@babel/runtime、@babel/polyfill、@babel/preset-env

新增工程的babel.config.js, 具体代码如下：
```
const presets = [
  // 根、子目录的公共预设
  [
    '@babel/preset-env',
    {
      "modules": false,
      "targets": {
        "browsers": [
          "> 1%",
          "last 2 versions",
          "not ie <= 8"
        ]
      }
    }
  ]
 ]
 const plugins = [
  // 根、子目录的公共插件
  "@babel/plugin-transform-runtime"
 ]
 module.exports = {
   presets,
   plugins,
   babelrcRoots: ['.'], // 允许这两个子 package 加载 babelrc 相对配置
   exclude: /node_modules/
 }
```

TypeError: Cannot read property 'vue' of undefined 需要升级vue-loader       
升级之后，loader 不生效。       
Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要用上上 VueLoaderPlugin的.        
具体如下：
```
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
......
plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin()
],
}
webpack loader 还是有问题 最终是merge 那里的loader 有问题
```

+ build OptimizeCSSPlugin css压缩去除
+ optimize-css-assets-webpack-plugin webpack4 进行单独的css压缩
+ terser-webpack-plugin替换掉uglifyjs-webpack-plugin
+ webpack4 css分离 ReferenceError: window is not defined
    - 因为style-loader 和 mini-css-extract-plugin 起冲突，去除掉style-loader即可
```
    new MiniCssExtractPlugin({
        filename: './css/[name].[hash:7].css'
    })
```
### 参考资料
[webpack4](http://louiszhai.github.io/2019/01/04/webpack4/)

https://segmentfault.com/a/1190000014247030?utm_source=tag-newest
https://www.jianshu.com/p/0a91fd682f66
