# 前端命令行工具 - commander
commander 的核心功能是解析命令行参数，并提供一系列简便的api。像vue init xxx,实现的初始化方式。

实现自定义命令基本步骤：
>1、创建一个package.json（npm init -y）,在里头定义bin字段，指定执行的文件：
```
"bin": {
    "xx": "./bin/xx.js"
}
```
要想在命令行中运行此命令，需创建关联到全局环境的软连接（symlink）
>2、在项目根目录下执行，创建软连接。
```
npm link // 方法1
npm install . -g // 方法2
```
>3、在bin/xx.js 的第一行必须添加```#!/usr/bin/env node``` ,指名用node来作为脚本的解释程序

案例如下:
```
#!/usr/bin/env node

const program = require('commander');
const packageJson = require('../package.json')
const chalk = require('chalk')

program
  .version(packageJson.version || 'unknown', '-v, --version')
  .option("-t, --test", "option test")
  .parse(process.argv);
console.log(chalk.red('自定义指令~'))
if (program.test) console.log(chalk.green("commander option test测试通过~"));
```

可以设置option 来进行业务处理,然后```.parse(process.argv)```必须要有。

## 实现一个全局webpack4多页打包命令 - zz
// todo


### 插件：
+ commander 一个帮助快速开发Nodejs命令行工具的package
+ chalk 终端输出时颜色样式输出工具
+ minimist 轻量级命令行参数解析引擎, 用于命令参数的提取
+ liftoff 实现对命令窗口的输入监听，以及命令格式化规格