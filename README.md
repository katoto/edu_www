# baseVueProject

基础描述整体功能(完成 webpack4 babel7 的升级)

> 这是一个单页，集成多语言(中文、繁体、English)、SEO（部分静态化）、ElementUI、响应式。基本上能应付常见的站点了

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

> 每新增一个页面就对应新增对应的 sitemap.xml 文件，利于 seo。

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

## 升级 webpack4 & babel7


- 升级 webpack、webpack-cli、webpack-dev-server 依赖包

- extract-text-webpack-plugin 已废除 使用 mini-css-extract-plugin 替换(用于提前css)
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

- Cannot find module '@webassemblyjs/helper-code-frame' 提示 cannot find module。 
    + 安装有问题，删除 node_module，然后重新安装。
- webpack.optimize.CommonsChunkPlugin 已废除使用 [split-chunks-plugin](https://webpack.docschina.org/plugins/split-chunks-plugin/)

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
- optimize-css-assets-webpack-plugin webpack4 进行单独的 css 压缩，插件处加上
```
new MiniCssExtractPlugin({
    filename: './css/[name].[hash:7].css'
})
```
- 移除 UglifyJsPlugin
- NoEmitOnErrorsPlugin 废弃，由 optimization.noEmitOnErrors 替代，生产环境默认开启。
- NamedModulesPlugin 废弃，由 optimization.namedModules 替代，生产环境默认开启。
- 加上对应打包的mode模式 mode: 'development', // production development none

## 升级 babel 7

- 安装 babel-loader 、@babel/core、@babel/plugin-transform-runtime、@babel/runtime、@babel/polyfill、@babel/preset-env

babel7 配置文件有变更，新增工程的 babel.config.js,这是一个最终版的配置,具体代码如下：

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
如果子目录有独立的配置，可以在子目录处使用.babelrc.js进行配置。
然后再babelrcRoots选项进行声明，其用来配置要查找子配置的目录。例如：
```
babelrcRoots: ['./test', './test2']
```
+ 使用 @babel/env 控制输出文件需要支持的环境。
+ modules: false, 控制babel打包后的模块引入方式使用ESmodule, 便于webpack Tree shaking

遇到的问题：
+ TypeError: Cannot read property 'vue' of undefined 需要升级 vue-loader  
+ 升级之后，loader 不生效。  
+ Vue-loader 在 15.\*之后的版本都是 vue-loader 的使用都是需要用上上 VueLoaderPlugin 的.  
具体如下：

```
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    // ......
    plugins: [
        new VueLoaderPlugin()
    ],
}

```
+ webpack loader 还是有问题,最终发现是merge 那里的loader覆盖造成的。
- build OptimizeCSSPlugin css 压缩去除
- optimize-css-assets-webpack-plugin webpack4 进行单独的 css 压缩
- terser-webpack-plugin 替换掉 uglifyjs-webpack-plugin
- webpack4 css 分离 ReferenceError: window is not defined
  - 因为 style-loader 和 mini-css-extract-plugin 起冲突，去除掉 style-loader 即可

```
    new MiniCssExtractPlugin({
        filename: './css/[name].[hash:7].css'
    })
```

## eslint格式化修改需要以下依赖和prettier 插件
原使用的是javascript-standard-style规范，为了更严格地统一编码，也为了让换行、缩进等格式规则不影响大家的开发效率，我们引入了prettier做各类型文件的自动格式化。再由于standard规范和prettier的结合并不友好，改为使用eslint的推荐规范：eslint:recommended，来规范js代码。[eslint:recommended](https://cn.eslint.org/docs/rules/)
最终eslint的配置内容如下：
```
module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  extends: ['eslint:recommended', 'plugin:vue/essential', 'prettier'],
  globals: {
    axios: 'readonly',
    Vue: 'readonly',
    weex: 'readonly',
    loginReady: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['vue', 'prettier'],
  rules: {
    'prettier/prettier': ['warn', { printWidth: 120, endOfLine: 'auto' }],
    'no-debugger': process.env.NODE_ENV === '"production"' ? 'error' : 'off',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-unused-vars': ['error', { args: 'none' }],
    'no-control-regex': 'off'
  }
}

```
要做如下处理：
+ 新增如下配置依赖
```
"eslint-config-prettier": "^6.6.0",
"eslint-plugin-prettier": "^3.1.1",
"eslint-plugin-vue": "^6.0.1",
```
+ vscode 安装插件eslint和prettier
+ 修改编辑器的配置文件内容
```
{
    "window.zoomLevel": 0,
    "editor.renderWhitespace": "all",
    "editor.insertSpaces": true,
    "editor.tabSize": 4,
    "editor.trimAutoWhitespace": false,
    "explorer.confirmDragAndDrop": false,
    "editor.detectIndentation": false,
    "editor.formatOnSave": false,
    "[html]": {
        "editor.formatOnSave": true
    },
    "[css]": {
        "editor.formatOnSave": true
    },
    "[less]": {
        "editor.formatOnSave": true
    },
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",
        {
            "language": "vue",
            "autoFix": true
        }
    ],
    "eslint.options": {
        "configFile": ".eslintrc.js"
    },
    "workbench.editor.enablePreviewFromQuickOpen": false,
    "explorer.confirmDelete": false,
    "editor.wordWrap": "on",
    "workbench.sideBar.location": "left",
    "extensions.ignoreRecommendations": true,
    "debug.inlineValues": true,
    "window.menuBarVisibility": "visible",
    "workbench.editor.enablePreview": false,
    "breadcrumbs.enabled": true,
    "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
    "javascript.updateImportsOnFileMove.enabled": "always",
    "files.eol": "\r\n",
    "editor.wordSeparators": "`~!@#$%^&*()=+[{]}\\|;:'\",.<>/?",
    "vetur.format.defaultFormatter.html": "none",
    "vetur.format.defaultFormatter.js": "none",
    "eslint.enable": true,
    "vsicons.dontShowNewVersionMessage": true,
    "files.associations": {
        "*.cjson": "jsonc",
        "*.wxss": "css",
        "*.wxs": "javascript"
    },
    "emmet.includeLanguages": {
        "wxml": "html"
    },
    "minapp-vscode.disableAutoConfig": true,
    "terminal.integrated.shell.windows": "D:\\Users\\zgxie\\AppData\\Local\\Programs\\Git\\bin\\bash.exe",
    "[vue]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "files.autoSave": "afterDelay"
}
```
### 升级之后对比
旧打包时间和文件大小，总体时间 74s。升级后64s。整体时间慢是因为生成静态文件造成的。
去除静态配置生成的时间17-18秒。体积也有对象缩小

####  old 打包
![old](https://raw.githubusercontent.com/katoto/edu_www/master/old.png)
####  new 打包
![new](https://raw.githubusercontent.com/katoto/edu_www/master/new.png)


### 参考资料

[webpack4](http://louiszhai.github.io/2019/01/04/webpack4/)
https://zhuanlan.zhihu.com/p/81839632
https://segmentfault.com/a/1190000014247030?utm_source=tag-newest
https://www.jianshu.com/p/0a91fd682f66
