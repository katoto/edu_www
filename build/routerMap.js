const path = require('path')
const fs = require('fs')

let routeJson = null
let reg = /let routesArr = (\[.*?\])/gi

fs.readFile('../src/router/index.js','utf-8',(err, data)=>{
    routeJson = reg.exec(data.toString())
    console.log(routeJson)
})


