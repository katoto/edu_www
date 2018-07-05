module.exports = {
    language: 'zh-cn',
    fileSuffix: ['.vue', '.js'],
    root: './src',
    usedFile: 'used.json',
    unusedFile: 'unused.json',
    noTranslateFile: 'noTranslate.json',
    distDir: 'language-dist',
    ignoreFile: [
        'src/plugins/language.vue',
        'src/pages/cs_protocol/policy.vue',
        'src/pages/cs_protocol/terms.vue'
    ]
}