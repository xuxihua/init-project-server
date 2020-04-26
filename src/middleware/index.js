/*
 * @Description: 中间件统一管理
 * @Version: 1.0
 * @Autor: xuxihua
 * @Date: 2020-04-17 17:07:15
 * @LastEditors: xuxihua
 * @LastEditTime: 2020-04-25 11:42:51
 */

const { CLIENTHOST } = require('./../config/config')
const path = require('path')
const ip = require('ip')
const miSend = require('./mi-send')
const miLog = require('./mi-log')
const miHttpError = require('./mi-http-error')
const miRule = require('./mi-rule')
const miCheckToken = require('./mi-check-token')
const cors = require('koa2-cors')
module.exports = (app) => {

  // 设置跨域
  app.use(cors({
      origin: function (ctx) {
          // if (ctx.url === '/test') {
          //     return "*"; // 允许来自所有域名请求
          // }
          return CLIENTHOST; // 只允许该域名的请求通过了
      },
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
      maxAge: 5,
      credentials: true,
      allowMethods: ['GET', 'POST', 'DELETE'],
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }))

  /**
   * 在接口的开头调用
   * 指定 controller 文件夹下的 js 文件，挂载在 app.controller 属性
   * 指定 service 文件夹下的 js 文件，挂载在 app.service 属性
   */ 
  miRule({
    app,
    rules: [
      {
        folder: path.join(__dirname, '../controller'),
        name: 'controller'
      },
      {
        folder: path.join(__dirname, '../service'),
        name: 'service'
      }
    ]
  })

  // 应用请求错误中间件
  app.use(miHttpError())
  
	// 将配置中间件的参数在注册中间件时作为参数传入
  app.use(miLog({
    env: app.env,  // koa 提供的环境变量
    projectName: 'xixi_customize_server',
    appLogLevel: 'debug',
    dir: 'logs',
    serverIp: ip.address()
  }))
  
  // 检查token
  app.use(miCheckToken())
	
	// 注册中间件
  app.use(miSend())

  // 增加错误的监听处理
  app.on("error", (err, ctx) => {
    // 若错误处理未向客户端发送响应头，则返回404给客户端
    if (ctx && !ctx.headerSent && ctx.status < 500) {
      ctx.status = 404
      console.log('监听处理了')
    }
    // 若错误未写入日志，则将错误写入日志
    if (ctx && ctx.log && ctx.log.error) {
      if (!ctx.state.logged) {
        ctx.log.error(err.stack)
      }
    }
  })
}