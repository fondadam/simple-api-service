const {tuling} = require('../controllers')
const {METHOD_TYPE} = require('../utils/common')
const {POST} = METHOD_TYPE

const tulingApi = {
	[`${POST}/tuling`]: {
		'desc': '图灵机器人回复',
		'func': async (ctx) => {
			const postData = ctx.request.body
			const data = await tuling.postAndTulingReply(postData)

			ctx.rest(data)
		}
	}
}

module.exports = tulingApi
