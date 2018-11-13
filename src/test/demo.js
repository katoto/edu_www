// const http = require('http')
// const PORT = 3001
// const router = (req, res) => {
//     res.end('fsdf')
// }
// const server = http.createServer(router)
// server.listen(PORT, function () {
//     console.log('111')
// })

const http = require('http')
const PORT = 3001

// 控制器
const controller = {
    index (req, res) {
        res.end('this is index page')
    },
    home (req, res) {
        res.end('this is home page')
    }
}

const router = (req, res) => {
    if (req.url === '/') {
        controller.index(req, res)
    } else {
        controller.home(req, res)
    }
}

// 服务
const server = http.createServer(router)
server.listen(PORT, function () {
    console.log('server is stary')
})
