/**
 *  相关的工具函数
 */

import Cookies from 'js-cookie'

export const access_token = '3d81a4a18c5a943303bed1c467ec9047'
export const account_id = '2389175'

export const src = 'pc'
export const tipsTime = 3000
export const ethUrl = 'https://etherscan.io/'

export function mapActions(acts, ns) {
	const aTypes = {}
	const actions = {}
	Object.keys(acts).forEach((key) => {
		aTypes[key] = [ns, key].join('/')
		actions[aTypes[key]] = acts[key]
	})
	return {actions, aTypes}
}

export const platform = 'pc'
// export const platform = (function () {
// 	return ~navigator.userAgent.indexOf('iPhone') ? 'ios' : 'android'
// })()

export function mapMutations(muts, ns) {
	const mTypes = {}
	const mutations = {}
	Object.keys(muts).forEach((key) => {
		mTypes[key] = [ns, key].join('/')
		mutations[mTypes[key]] = muts[key]
	})
	return {mutations, mTypes}
}

export function wait(time) {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), time)
	})
}

export const isWeiX = (function () {
	let ua = navigator.userAgent.toLowerCase()
	return ~ua.indexOf('micromessenger')
})()

const CK = 'coinslot_ck'
export function getCK() {
	return Cookies.get(CK)
}
export function setCK(ck) {
	return Cookies.set(CK, ck)
}

export function removeCK() {
	return Cookies.remove(CK)
}

export function isLog() {
	return ( getCK() === '0' || !getCK() ) ? false : true
}

/*
 *   format_match  玩法选择
 * */
export function format_match_account(match) {
	if (isNaN(match)) {
		return '';
	}
	match = match.toString();
	switch (match) {
		case '1101':
			return 'Lucky 11/C1'
				;
			break;
		case '1102':
			return 'Lucky 11/C2'
				;
			break;
		case '1103':
			return 'Lucky 11/C3'
				;
			break;
		case '1104':
			return 'Lucky 11/C4'
				;
			break;
		case '1105':
			return 'Lucky 11/C5'
				;
			break;
	}
}

export function formateBalance(val = 0){
	let newEth = null;
	if (isNaN(val) || isNaN(Number(val))) {
		console.error('formateBalance error' + val);
		return 0;
	}
	val = Number(val);
	if (val > 10000000) {
		newEth = ( val / 100000000).toFixed(1) + '亿';
	} else if (val > 100000) {
		newEth = ( val / 10000).toFixed(1) + '万';
	} else if (val > 1000) {
		newEth = parseFloat(( val ).toFixed(0));
	} else if (val > 100) {
		newEth = ( val ).toFixed(3);
	} else if (val > 10) {
		newEth = ( val ).toFixed(4);
	} else {
		newEth = ( val ).toFixed(5);
		// 如果需要去掉零 用parseFloat(  )
	}
	return newEth;
}