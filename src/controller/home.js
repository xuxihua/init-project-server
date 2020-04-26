/*
 * @Description: home页controller层
 * @Version: 1.0
 * @Autor: xuxihua
 * @Date: 2020-04-17 17:07:15
 * @LastEditors: xuxihua
 * @LastEditTime: 2020-04-23 14:19:33
 */
module.exports = {
  home: async(ctx, next) => {
    // 解构出 app 实例对象
    const { app } = ctx

    // 调用service层
    let res = await app.service.home.test()
    await (ctx.body = res)
  }
}