/*
 * @Description: user页controller层
 * @Version: 1.0
 * @Author: xuxihua
 * @Date: 2020-04-21 17:23:17
 * @LastEditors: xuxihua
 * @LastEditTime: 2020-04-23 22:57:15
 */
const { md5Encrypt } = require('./../utils/common')

module.exports = {
	login: async (ctx, next) => {
		// 解构出 app 实例对象
		const { app } = ctx

		// 参数处理
		let params = ctx.request.body
		params.password = md5Encrypt(params.password)

		// 调用service层
		let res = await app.service.user.login(params)
		await (ctx.body = res)
	},
	register: async (ctx, next) => {
		// 解构出 app 实例对象
		const { app } = ctx

		// 参数处理
		let params = ctx.request.body
		params.password = md5Encrypt(params.password)

		// 调用service层
		let res = await app.service.user.register(params)
		await (ctx.body = res)
	}
}