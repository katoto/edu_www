let en = {
    a1: 'this is a demo'
}

let zhCn = {
    a1: '这是一个模板'
}

let zhTw = {
    a1: '這是一個模板'
}

// 组件内运用直接变量访问 $lang.demo.a1 会根据页面当前环境获取词条

export default { en, zhCn, zhTw }
