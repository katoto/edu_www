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