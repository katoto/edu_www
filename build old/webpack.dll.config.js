//webpack.dll.conf.js

// 1、 利用DllPlugin 提前打包好
// 2、 输出打包 DllReferencePlugin 引入提前打包得东西  感觉没啥用

		// new webpack.DllReferencePlugin({
		// 	context: __dirname,
		// 	manifest: require('../dist/site/vendor-manifest.json')
		// })

const path = require('path');
const webpack = require('webpack');
console.log(111)

module.exports = {
  entry: {
    vendor: [
    'vue-router',
    'vue',
    'vuex',
    'axios',
    'es6-promise',
    'element-ui',
    'howler',
    'md5',
    'vuex-router-sync',
    'vue-clipboard2'//提前打包一些基本不怎么修改的文件
    ]
  },
  output: {
    path: path.join(__dirname, '../dist/site'), //放在项目的static/js目录下面
    filename: '[name].dll.js', //打包文件的名字
    library: '[name]_library' //可选 暴露出的全局变量名
    // vendor.dll.js中暴露出的全局变量名。
    // 主要是给DllPlugin中的name使用，
    // 故这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../dist/site/', '[name]-manifest.json'), //生成上文说到清单文件，放在当前build文件下面，这个看你自己想放哪里了。
      name: '[name]_library'
    }),
  ]
};
