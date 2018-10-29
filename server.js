const http = require('http')

http.createServer((request, response) => {
    let cookieString = 'Your Cookie is: '
    let noCookieString = 'You have no cookie'
    response.end(
        request.headers.cookie ? (cookieString + request.headers.cookie) : noCookieString
    )
}).listen(9000)