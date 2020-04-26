/*
 * @Description: 路由管理
 * @Version: 1.0
 * @Author: xuxihua
 * @Date: 2020-04-17 17:07:21
 * @LastEditors: xuxihua
 * @LastEditTime: 2020-04-23 14:28:54
 */
const router = require('koa-router')()
module.exports = (app) => {
  // home
  router.get('/', app.controller.home.home)
  router.get('/home', app.controller.home.home)

  // user
  router.post('/user/login', app.controller.user.login)
  router.post('/user/register', app.controller.user.register)

  app.use(router.routes()).use(router.allowedMethods())
}