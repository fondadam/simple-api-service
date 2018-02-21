const request = require('request-promise')
const _ = require('lodash')

const log = require('./log')

const formatDate = (date = new Date()) => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()
	
	return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}


const get = (uri, options = {}) => {
	options = Object.assign({}, options, {method: "GET", uri})
	
	return request(options)
}

const post = (uri, options = {}) => {
	options = Object.assign({}, options, {method: "POST", uri})
	
	return request(options)
}

const leftPadZero = (m) => (`${m}`.length === 1 ? `0${m}` : `${m}`)

const getTodayDate = () => {
	const date = new Date()
	const month = date.getMonth() + 1
	const day = date.getDate()
	return `${leftPadZero(month)}-${leftPadZero(day)}`
}

const compactObject = (obj) => (_.pickBy(obj, (v) => (v !== undefined && v !== null)))

const METHOD_TYPE = {
	GET: 'GET ',
	POST: 'POST ',
	PUT: 'PUT ',
	DELETE: 'DELETE '
}

module.exports = {
	METHOD_TYPE,
	log,
	formatDate,
	get,
	post,
	leftPadZero,
	getTodayDate,
	compactObject
}