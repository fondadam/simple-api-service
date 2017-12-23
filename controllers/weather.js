"use strict"

// 天气预报
// 配置
const config = require('../config')
const URL = 'https://api.seniverse.com/v3/'
const UID = config.weather_uid
const KEY = config.weather_key

const _ = require('lodash')
const crypto = require('crypto')
const querystring = require('querystring')
const {get, leftPadZero, compactObject} = require('../utils/common')


// 根据天气code 返回 微信emoji表情
const code2Emoji = (code) => {
	let emoji = ''
	
	switch(+code) {
		case 0:
		case 1:
		case 2:
		case 3:
			emoji = '☀/:sun☀'
			break
		case 4:
			emoji = '💭⛅💭'
			break
		case 5:
		case 6:
		case 7:
			emoji = '⛅⛅⛅'
			break
		case 8:
		case 9:
			emoji = '💭⛅☁ '
			break
		case 9:
			emoji = '💭☁☁ '
			break
		case 10:
		case 11:
		case 12:
		case 13:
		case 14:
		case 15:
			emoji = '🌂☔🌧'
			break
		case 16:
		case 17:
		case 18:
		case 19:
		case 20:
			emoji = '⚡🌧⚡🌧'
			break
		default:
			emoji = '❗❗❗'
			break
	}
	return emoji
}

const getSignatureParams = function() {
	let params = {}
	
	params.ts = Math.floor((new Date()).getTime() / 1000)  // 当前时间戳
	params.ttl = 300        // 过期时间
	params.uid = UID   // 用户ID
	
	const str = querystring.encode(params) // 构造请求字符串
	
	// 使用 HMAC-SHA1 方式，以API密钥（key）对上一步生成的参数字符串进行加密
	params.sig = crypto.createHmac('sha1', KEY)
		.update(str)
		.digest('base64') // 将加密结果用 base64 编码，并做一个 urlencode，得到签名 sig
	
	return params
}

// 查询近 3 天的天气
const getNear3Days = function(location = 'Shenzhen') {
	let params = getSignatureParams()
	params.location = location
	
	return new Promise((resolve, reject) => {
		get(`${URL}weather/daily.json`, {
			qs: params,
			json: true
		}).then(result => {
			result = result.results[0] || {}
			
			const location = result.location
			const last_update = result.last_update
			
			const daily = result.daily
			
			// 天气最后更新时间
			const dataObject = new Date(last_update)
			const weatherLastUpdate =
				`${dataObject.getMonth() + 1}月${dataObject.getDate()}日` +
				`${leftPadZero(dataObject.getHours())}:${leftPadZero(dataObject.getMinutes())}`
			
			// 天气location
			const weatherName = location.name
			
			// 近3天的天气信息
			const weatherInfoList = _.map(daily, (v, i) => {
				let ret = compactObject({
					// 白天天气描述
					desc_day: v.text_day,
					code_day: v.code_day,
					emoji_day: code2Emoji(v.code_day),
					// 晚上天气描述
					desc_night: v.text_night,
					code_night: v.code_night,
					emoji_night: code2Emoji(v.code_night),
					high: v.high,
					low: v.low,
					// 风速
					wind_speed: v.wind_speed,
					// 风力等级
					wind_scale: v.wind_scale
				})
				if(i === 0) {
					ret.name = '今天'
				} else if(i === 1) {
					ret.name = '明天'
				} else if(i === 2) {
					ret.name = '后天'
				}
				return ret
			})
			
			resolve({
				name: weatherName,
				list: weatherInfoList,
				lastUpdate: weatherLastUpdate
			})
		}).catch(error => (reject(error)))
	})
}

// 根据 location 查询近实时的天气
const getCurrent = function(location = 'Shenzhen') {
	let params = getSignatureParams()
	params.location = location
	
	return new Promise((resolve, reject) => {
		get(`${URL}weather/now.json`, {
			qs: params,
			json: true
		}).then(result => {
			result = result.results[0] || {}
			
			const location = result.location
			const last_update = result.last_update
			
			const now = result.now
			
			// 天气最后更新时间
			const dataObject = new Date(last_update)
			const weatherLastUpdate =
				`${dataObject.getMonth() + 1}月${dataObject.getDate()}日` +
				`${leftPadZero(dataObject.getHours())}:${leftPadZero(dataObject.getMinutes())}`
			
			// 天气location
			const weatherName = location.name
			// 实时天气info
			const weatherInfo = {
				text: now.text,
				emoji: code2Emoji(now.code),
				temperature: now.temperature,
				feels_like: now.feels_like,
				// 相对湿度
				humidity: now.humidity,
				// 能见度
				visibility: now.visibility,
				// 风向
				wind_direction: now.wind_direction,
				// 风速
				wind_speed: now.wind_speed,
				// 风力等级
				wind_scale: now.wind_scale
			}
			
			resolve({
				name: weatherName,
				info: compactObject(weatherInfo),
				lastUpdate: weatherLastUpdate
			})
		}).catch(error => (reject(error)))
	})
}

module.exports = {
	// 根据location查询近 3 天的天气
	getNear3Days,
	// 根据location查询实时天气
	getCurrent
}
