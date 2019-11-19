'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf.js')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const prerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = prerenderSPAPlugin.PuppeteerRenderer

const env = require('../config/prod.env')

let _isPreRelease = process && process.env && process.env.NODE_ENV === 'preRelease'

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

let plugins = [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
        'process.env': {
            ...env,
            NODE_ENV: `"${process.env.NODE_ENV}"`
        }
    }),
    new HtmlWebpackPlugin({
        filename: config.build.index,
        template: 'index.html',
        inject: true,
        favicon: resolve('favicon.ico'),
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
            // more options:
            // https://github.com/kangax/html-minifier#options-quick-reference
        },
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    // copy custom static assets
    new CopyWebpackPlugin([
        {
            from: path.resolve(__dirname, '../static'),
            to: config.build.assetsSubDirectory,
            ignore: ['.*']
        }, {
            from: path.resolve(__dirname, '../sitemap.xml'),
            to: '../dist',
            ignore: ['.*']
        }
    ]),
]

if (!_isPreRelease) {
    plugins.push(new prerenderSPAPlugin({
        staticDir: path.join(__dirname, '../dist'),
        routes: ['/', '/movie', '/tvplay', '/htmlnav', '/pmnav', '/eduIndex/Class1', '/eduIndex/Class2', '/eduIndex/Class3', '/eduIndex/Class4', '/eduIndex/Class5', '/eduIndex/Class6', '/edumsg/201988$888888'],
        minify: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            decodeEntities: true,
            keepClosingSlash: true,
            sortAttributes: true
        },
        server: {
            port: 4570
        },
        renderer: new Renderer({
            headless: false,
            renderAfterElementExists: '#app',
            renderAfterTime: 5000,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        }),
        postProcess(renderedRoute) {
            renderedRoute.html = renderedRoute.html.replace(/[\n]|[\r]/g, "").replace(/(\<head\>.*?)(\<script.*?\<\/script\>){1,}(.*\<\/head\>)/g, '$1$3')
                .replace(/<div id="app"[^>]*>/i, '<div id="app" style="visibility:hidden">');
            return renderedRoute
        }
    }))
}

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production', // production development none
    optimization: {
        minimizer: [
          new TerserJSPlugin({}),
          new OptimizeCSSAssetsPlugin({})
        ]
      },
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash:7].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash:7].js')
    },
    plugins
})

if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
