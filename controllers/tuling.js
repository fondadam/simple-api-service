const util = require('util')
const {post} = require('../utils/common')
const {tulingKey: key} = require('../config.js')

// 配置url
const URL = `http://www.tuling123.com/openapi/api`

const postAndTulingReply = async (postData) => {
	postData = Object.assign({}, postData, {key})

	return new Promise((resolve) => {
		post(URL, {qs: postData}).then(result => resolve(result))
	})
}

module.exports = {
	postAndTulingReply
}