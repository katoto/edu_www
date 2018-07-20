const path = require('path')
const fs = require('fs')

let routeJson = null
let reg = /let routesArr = (\[.*?\])/gi
let rmComponentReg = /component.*?[^}]/gi

// let reg = /let routesArr = (\[.*?\])/gi

fs.readFile('../src/router/index.js','utf-8',(err, data)=>{
    let newData = data.toString().replace(/\n/g,'');
    let currRout = null
    routeJson = reg.exec(newData)[0]
    console.log(routeJson)
    routeJson = routeJson.replace(rmComponentReg,' ')
    console.log('==========')
    console.log(routeJson);
    // console.log( JSON.parse(routeJson) )
    console.log('==========')
})


