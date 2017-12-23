const superagent = require('superagent')
const cheerio = require('cheerio')

const {getTodayDate} = require('../utils/common')

// 新闻获取地址
const currentNewsUrl = "http://live.nbd.com.cn/"

// 新闻早报
const morningNewsUrl = "http://city.shenchuang.com/guonei/yw.shtml"

// 根据limit 获取实时新闻
const getCurrentNewsList = (LIMIT = 8) => {
	return new Promise((resolve, reject) => {
		try {
			superagent.get(currentNewsUrl).end((err, res) => {
				if (err) {
					throw new Error(err)
				}
				const $ = cheerio.load(res.text)
				
				let data = []
				
				const contentDOM = $('#macroscopic-articles .live-list:first-child')[0]
				const newsList = $(contentDOM).find('li')
				
				newsList.each((i, item) => {
					if(i >= LIMIT) {
						return false
					}
					let _this = $(item)
					const href = _this.find('.li-text a').attr('href')
					const aText = _this.find('.li-text a').text()
					const timeDOM = _this.find('.li-title .title-p span')
					const time = `${getTodayDate()} ${timeDOM.text()}`
					
					const from = aText.match(/。[(（].*[)）]/ig)
					
					const fromTextList = /.*[（(](.*)[）)]/ig.exec(aText)
					
					const summaryList = /(.*)[（(].*[）)]$/ig.exec(aText)
					
					if(from) {
						data.push({
							index: i,
							time,
							href,
							from: fromTextList ? fromTextList[1] : null,
							summary: summaryList ? summaryList[1] : null
						})
					}
				})
				resolve(data)
			})
		} catch(error) {
			reject(error)
		}
	})
}

// 新闻早报
const getMorningNews = (LIMIT = 8) => {
	return new Promise((resolve, reject) => {
		try {
			superagent.get(morningNewsUrl).end((err, res) => {
				if (err) {
					throw new Error(err)
				}
				const $ = cheerio.load(res.text)
				
				let data = []
				
				const contentDOM = $('.content .xia_nr .nr')[0]
				const newsList = $(contentDOM).find('.nrC')
				
				newsList.each((i, item) => {
					if(i >= LIMIT) {
						return false
					}
					const _this = $(item)
					
					const title = _this.find('.ltit a').text().replace(/\s+/ig, ' ')
					const href = _this.find('.ltit a').attr('href')
					
					const aText = _this.find('.ldep').text()
					const summary = aText.replace(/\.\.\[详情\]/ig, '')
					
					const dateTime = _this.find('.ldate').text()
					
					data.push({
						index: i,
						title,
						href,
						summary,
						dateTime
					})
				})
				
				resolve(data)
			})
		} catch(error) {
			reject(error)
		}
	})
}

module.exports = {
	getCurrentNewsList,
	getMorningNews
}
