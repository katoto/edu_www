let en = {
    a1: '24H Ban',
    a2: 'Permanent Ban',
    a3: 'Banned',
    a4: 'Cancel the Ban',
    a5: 'You have been permanently banned',
    a6: 'You have been banned, please retry after 2 hours',
    a7: '【System Info】 {0} has been permanently banned',
    a8: '【System Info】 The ban on {0} has been cancelled',
    a9: 'Send'
}

let zhCn = {
    a1: '禁言24小时',
    a2: '永久禁言',
    a3: '已禁言',
    a4: '取消禁言',
    a5: '您已被永久禁言，消息不可发送',
    a6: '您已被禁言，2小时候可恢复',
    a7: '【系统消息】 用户 {0} 已被永久禁言',
    a8: '【系统消息】 用户 {0} 已被解除禁言',
    a9: '发送'
}

let zhTw = {
    a1: '這是一個模板'
}

// 组件内运用直接变量访问 $lang.demo.a1 会根据页面当前环境获取词条
export default { en, zhCn, zhTw }
