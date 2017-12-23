const weather = require('./weather')
const news = require('./news')
const lunar = require('./lunar')

module.exports = {
	// 天气预报
	...weather,
	// 新闻
	...news,
	// 万年历
	...lunar
}