'use strict'

require('./clean')
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const webpack = require('webpack')
const emptyFile = path.resolve(__dirname, './empty.js')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

const getPublicPath = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return config.build.assetsPublicPath
    case 'preRelease':
      return config.preRelease.assetsPublicPath
    default:
      return config.dev.assetsPublicPath
  }
}

const isDebug = process.env.NODE_ENV
console.log(isDebug)
console.log(isDebug)
console.log(isDebug)
console.log(isDebug)
console.log(isDebug)
console.log(utils.styleLoaders({
    sourceMap: config.productionSourceMap,
    extract: process.env.NODE_ENV === 'production'
  }))

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: getPublicPath()
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '~common': path.resolve(__dirname, '../src/common'),
      '@common': path.resolve(__dirname, '../src/common'),
      '~assets': path.resolve(__dirname, '../src/assets'),
      '@static': path.resolve(__dirname, '../static'),
      '~static': path.resolve(__dirname, '../static'),
      '@assets': path.resolve(__dirname, '../src/assets'),
      '~components': path.resolve(__dirname, '../src/components'),
      '~store': path.resolve(__dirname, '../src/store'),
      '~pages': path.resolve(__dirname, '../src/pages'),
      '~router': path.resolve(__dirname, '../src/router'),
      '~language': path.resolve(__dirname, '../src/language'),
      '~': path.resolve(__dirname, '../src'),
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        },
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [resolve('src/icons')],
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      ...utils.styleLoaders({
        sourceMap: config.productionSourceMap,
        extract: process.env.NODE_ENV === 'production'
      })
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
	},
	optimization: {
		splitChunks: {
			chunks: 'async', // 共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)
			minSize: 30000, // 模块超过30k自动被抽离成公共模块
			minChunks: 1, // 模块被引用>=1次，便分割
			maxAsyncRequests: 5, // 异步加载chunk的并发请求数量<=5
			maxInitialRequests: 3, // 一个入口并发加载的chunk数量<=3
			name: true, // 默认由模块名+hash命名，名称相同时多个模块将合并为1个，可以设置为function
			automaticNameDelimiter: '~', // 命名分隔符
			cacheGroups: {
				// 缓存组，会继承和覆盖splitChunks的配置
				default: {
					// 模块缓存规则，设置为false，默认缓存组将禁用
					minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
					priority: -20, // 优先级
					reuseExistingChunk: true // 默认使用已有的模块
				},
				vendors: {
					test: /[\\/]node_modules[\\/]/, // 表示默认拆分node_modules中的模块
					priority: -10
				}
			}
		}
	},
  plugins: [
		new VueLoaderPlugin()
  ]
}
