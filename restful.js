const {log} = require('./utils/common')

module.exports = {
	restify: () => {
		return async (ctx, next) => {
			log.info(`${ctx.request.method} -> ${ctx.request.url}`);
			ctx.rest = (data, msg='ok', type = 'application/json') => {
				ctx.type = type
				ctx.body = {
					code: '0',
					msg,
					data
				}
			}
			try {
				await next()
			} catch (e) {
				const error = e && e.error || {}
				log.error('Process API ERROR:', error)
				ctx.status = 200
				ctx.type = 'application/json'
				ctx.body = {
					code: error.status_code || '-1',
					msg: error.status || 'error'
				}
			}
		}
	}
}
