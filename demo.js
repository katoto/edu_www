#!/usr/bin/env node

// 检测依赖是否已经更新。
let fs = require('fs');
let child_process = require('child_process');
console.log('======123====')
console.log(__dirname)
child_process.exec('git status', function (error, stdout, stderr) {
    if(error || stdout || stderr){
        throw new Error(
            '依赖库有代码更新，需处理'
        )
    }
});
if(process.cwd().includes('\\web_vip_m')){
    child_process.exec('cd ../web_vip_fui & git fetch', function (error, stdout, stderr) {
        if(error || stdout || stderr){
            throw new Error(
                'web_vip_fui依赖库有代码或者分支更新，要去进行处理并重新打包！(仅提示一次)'
            )
        }
    });
}