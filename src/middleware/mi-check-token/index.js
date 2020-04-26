/*
 * @Description: 检查token中间件
 * @Version: 1.0
 * @Author: xuxihua
 * @Date: 2020-04-22 17:19:01
 * @LastEditors: xuxihua
 * @LastEditTime: 2020-04-23 15:49:56
 */

const jwt = require('jsonwebtoken')
const { DATA } = require('./../../config/config')

module.exports = () => {
    return async (ctx, next) => {
        let url = ctx.request.url
        // 忽略请求路径为login或者register
        if (url === '/user/login' || url === '/user/register') await next()
        else {
            // 假定请求方式全部为POST，并且token在请求头的token字段中
            let token = ctx.cookies.get('token')
            if(!token) {
                DATA.data.data = {}
                DATA.data.msg = 'token不存在'
                DATA.code = -1
                ctx.body = DATA
                return
            }
            try {
                jwt.verify(token, 'sign', (err, decoded) => {
                    if (err) {
                        throw new Error('token无效')
                    }
                })
                await next()
            } catch (err) {
                DATA.data.data = {}
                DATA.data.msg = 'token无效'
                DATA.code = -2
                ctx.body = DATA
                return ctx.body
            }
        }
    }
}