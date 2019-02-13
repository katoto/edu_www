module.exports = {
	root: true,
	parser: 'babel-eslint',
	env: {
		browser: true,
		node: true,
		es6: true,
	},
	extends: 'standard',
	// required to lint *.vue files
	plugins: [
		'html'
	],
	// add your custom rules here
	//it is base on https://github.com/vuejs/eslint-config-vue
	rules: {
        "no-debugger": 0,
		// "indent": ["error", 4],
		"indent": [4, 4, {
			'SwitchCase': 2
		}],
		'semi': ['error','never'],
		'semi-spacing': [0, {
			'before': false,
			'after': false
		}],
		"no-var": 0,//禁用var，用let和const代替
		"no-console":0,
		"no-unused-vars":1,
		"no-mixed-spaces-and-tabs":0
    },
    globals: {
        "_": true
    }
}
