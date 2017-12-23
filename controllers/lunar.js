const util = require('util')
const {get} = require('../utils/common')

// 配置
const lunarURL = `http://tools.2345.com/frame/api/GetLunarInfo?date=%s`

const getLunar = async (date = new Date()) => {
	date = new Date(date)
	date = date.toLocaleDateString().replace(/-|\//ig, '')
	const url = util.format(lunarURL, date)
	
	return new Promise((resolve) => {
		get(url, {json: true}).then(result => {
			result = result.replace(/([{,])(\w+):/ig, '$1"$2":')
			result = JSON.parse(result)
			
			resolve(result)
		})
	})
}

module.exports = {
	getLunar
}