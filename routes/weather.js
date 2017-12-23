const {weather} = require('../controllers')
const {METHOD_TYPE} = require('../utils/common')
const {GET} = METHOD_TYPE

const weatherApi = {
	[`${GET}/weather`]: {
		'desc': '根据location获取实时天气',
		'func': async (ctx) => {
			const {location} = ctx.query
			const data = await weather.getCurrent(location)
			ctx.rest(data)
		}
	},
	[`${GET}/weather3days`]: {
		'desc': '获取近3天的天气(今天/明天/后天)',
		'func': async (ctx) => {
			const {location} = ctx.query
			const data = await weather.getNear3Days(location)
			ctx.rest(data)
		}
	}
}

module.exports = weatherApi
