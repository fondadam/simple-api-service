const {lunar} = require('../controllers')
const {METHOD_TYPE} = require('../utils/common')
const {GET} = METHOD_TYPE

const lunarApi = {
	[`${GET}/lunar`]: {
		'desc': '万年历',
		'func': async (ctx) => {
			const {date} = ctx.query
			const data = await lunar.getLunar(date)
			ctx.rest(data)
		}
	}
}

module.exports = lunarApi
