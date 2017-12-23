const {news} = require('../controllers')
const {METHOD_TYPE} = require('../utils/common')
const {GET} = METHOD_TYPE

const newsApi = {
	[`${GET}/news`]: {
		'desc': '获取实时实时新闻',
		'func': async (ctx) => {
			const {limit} = ctx.query
			const data = await news.getCurrentNewsList(limit)
			ctx.rest(data)
		}
	},
	[`${GET}/news/morning`]: {
		'desc': '早间新闻: 获取昨日焦点新闻',
		'func': async (ctx) => {
			const {limit} = ctx.query
			const data = await news.getMorningNews(limit)
			ctx.rest(data)
		}
	}
}

module.exports = newsApi
