/*
 * @Description: home页service层
 * @Version: 1.0
 * @Author: xuxihua
 * @Date: 2020-04-17 17:07:21
 * @LastEditors: xuxihua
 * @LastEditTime: 2020-04-24 15:17:04
 */
const { DATA } = require('./../config/config')

module.exports = {
  test: async () => {
    DATA.data.data = {}
    DATA.data.msg = '首页数据返回成功'
    return DATA
  }
}