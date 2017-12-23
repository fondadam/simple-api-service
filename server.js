const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const ip = require('ip')
const router = require('koa-router')()

const apiRoutes = require('./routes')
const {METHOD_TYPE, log} = require('./utils/common')
const {GET, POST, PUT, DELETE} = METHOD_TYPE

const app = new Koa()

const restful = require('./restful')
const config = require('./config')

app.use(bodyParser())

// ip 白名单
app.use(async (ctx, next) => {
	const ipAddress = ip.address()
	const whiteListFlag = config.whiteListFlag
	const whiteList = config.whiteList
	const accessFlag = whiteList.includes(ipAddress)
	
	if(!whiteListFlag || accessFlag) {
		log.info(`IP ACCESS -> ${ipAddress}`)
		await next()
	} else {
		log.warn(`IP DENY -> ${ipAddress}`)
		ctx.type = 'application/json'
		ctx.body = {
			code: '-1',
			msg: `您暂时没有权限访问该服务，请将您的ip: ${ipAddress} 加入到ip白名单后再重新访问。`
		}
	}
})

// bind rest() for ctx
app.use(restful.restify())

const addRoutes = (router, apiMapping) => {
	console.log('-----------------')
	console.log('api list:')
	for (let key in apiMapping) {
		const desc = apiMapping[key].desc
		const func = apiMapping[key].func
		
		if (key.startsWith(GET)) {
			const LENGTH_GET = GET.length
			const url = key.substring(LENGTH_GET)
			
			console.log(`${GET}${url}: ${desc}`)
			router.get(url, func)
		} else if (key.startsWith(POST)) {
			const LENGTH_POST = POST.length
			const url = key.substring(LENGTH_POST)
			
			console.log(`${POST}${url}: ${desc}`)
			router.post(url, func)
		} else if (key.startsWith(PUT)) {
			const LENGTH_PUT = PUT.length
			const url = key.substring(LENGTH_PUT)
			
			console.log(`${PUT}${url}: ${desc}`)
			router.put(url, func);
		} else if (key.startsWith(DELETE)) {
			const LENGTH_DELETE = DELETE.length
			const url = key.substring(LENGTH_DELETE)
			
			console.log(`${DELETE}${url}: ${desc}`)
			router.put(url, func)
		} else {
			console.log(`invalid: ${key}`)
		}
	}
	console.log('-----------------')
}

addRoutes(router, apiRoutes)

app.use(router.routes()).use(router.allowedMethods())

app.listen(config.port)
log.info(`App started at port ${config.port}...`)
