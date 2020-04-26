/*
 * @Description: 服务端入口函数
 * @Version: 1.0
 * @Author: xuxihua
 * @Date: 2020-04-17 17:08:17
 * @LastEditors: xuxihua
 * @LastEditTime: 2020-04-24 14:33:04
 */
const Koa = require('koa')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const nunjucks = require('koa-nunjucks-2')
const staticFiles = require('koa-static')
const mongoConnect = require('./db/mongo')

const app = new Koa()
const router = require('./router/router')

// =====中间件引用=======
const middleware = require('./middleware')
middleware(app)

// 指定 public目录为静态资源目录，用来存放 js css images 等
app.use(staticFiles(path.resolve(__dirname, "./public")))

// 视图层
app.use(nunjucks({
  ext: 'html',
  path: path.join(__dirname, 'views'),// 指定视图目录
  nunjucksConfig: {
    trimBlocks: true // 开启转义 防Xss
  }
}))


// 对http请求体进行解析
app.use(bodyParser())

// 连接数据库
mongoConnect.connect()

// 引入路由
router(app)

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})