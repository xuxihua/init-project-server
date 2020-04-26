/*
 * @Description: 配置文件
 * @Version: 1.0
 * @Autor: xuxihua
 * @Date: 2020-04-18 11:42:15
 * @LastEditors: xuxihua
 * @LastEditTime: 2020-04-22 17:28:08
 */

 // 客户端本地接口
const CLIENTHOST = 'http://localhost:8080'

// 返回ctx数据的数据结构
let DATA = {
    code: 0,
    data: {
        data: {},
        msg: ''
    }
}

module.exports = {
    CLIENTHOST,
    DATA
}