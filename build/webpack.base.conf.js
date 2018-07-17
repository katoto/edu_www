'use strict'
require('./clean')
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const webpack = require("webpack");
const vConsolePlugin = require('vconsole-webpack-plugin')
const emptyFile = path.resolve(__dirname, './empty.js')

const prerenderSPAPlugin = require('prerender-spa-plugin')

function resolve (dir) {
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
console.log(isDebug);

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
			'vue$': 'vue/dist/vue.esm.js',
			'@': resolve('src'),
			'~': path.resolve(__dirname, '../src'),
			'~common': path.resolve(__dirname, '../src/common'),
			'@common': path.resolve(__dirname, '../src/common'),
			'~assets': path.resolve(__dirname, '../src/assets'),
			'@static': path.resolve(__dirname, '../src/static'),
			'~static': path.resolve(__dirname, '../src/static'),
			'@assets': path.resolve(__dirname, '../src/assets'),
			'~components': path.resolve(__dirname, '../src/components'),
			'~store': path.resolve(__dirname, '../src/store'),
			'~pages': path.resolve(__dirname, '../src/pages'),
            '~router': path.resolve(__dirname, '../src/router')
		}
	},
	module: {
		rules: [
			...(config.dev.useEslint ? [createLintingRule()] : []),
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader',
            },
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: vueLoaderConfig
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [resolve('src'), resolve('test') ,resolve('node_modules/webpack-dev-server/client')]
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
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
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
					limit: 10000,
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
			}
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
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('common.js'),
		// new webpack.ProvidePlugin({
		// 	jQuery: "jquery",
		// 	$: "jquery"
		// }),
        new vConsolePlugin({enable:!isDebug}),
        new prerenderSPAPlugin({
            staticDir:path.join(__dirname,'../dist'),
            routes:['/lucky11','/slot', '/luckycoin'],
            minify:{
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                decodeEntities: true,
                keepClosingSlash: true,
                sortAttributes: true
            },
            postProcess (renderedRoute) {
                renderedRoute.html = renderedRoute.html.replace(/[\n]/g,"").replace(/(\<head\>.*?)(\<script.*?\<\/script\>){1,}(.*\<\/head\>)/g, '$1$3')
                return renderedRoute
            }
        })
	]
}
