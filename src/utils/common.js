/*
 * @Description: 公共方法
 * @Version: 1.0
 * @Author: xuxihua
 * @Date: 2020-04-23 15:14:05
 * @LastEditors: xuxihua
 * @LastEditTime: 2020-04-24 15:00:56
 */
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

module.exports = {
    /**
     * @description: 创建token
     * @param {type} 
     * @return: none
     * @author: xuxihua
     */
    createToken: (payload, sign, time) => {
	    // 放在token中的数据
        payload = {
            _id: payload._id,
            username: payload.username
        }
        // sign为密钥，可以是自定的字符串，也可以是私钥
        // 其他选项
        let options = {
            //过期时间，表示秒的数字，或者表示时间跨度的字符串，格式见：
            // https://github.com/zeit/ms
            expiresIn: time
        }
        let token = jwt.sign(payload, sign, options)
        return token
    },
    /**
     * @description: md5加密
     * @param {msg} 
     * @return: result
     * @author: xuxihua
     */
    md5Encrypt: (msg) => {
        let result = crypto.createHash('md5').update(msg).digest("hex")
        return result
    }
} 