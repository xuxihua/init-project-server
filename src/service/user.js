/*
 * @Description: user页service层
 * @Version: 1.0
 * @Author: xuxihua
 * @Date: 2020-04-21 17:23:52
 * @LastEditors: xuxihua
 * @LastEditTime: 2020-04-24 15:04:33
 */
const mongoose = require('mongoose')
const Users = require('./../models/user')
const { DATA } = require('./../config/config')
const { createToken } = require('./../utils/common')

module.exports = {
	/**
	 * @description: 根据_id查询用户
	 * @param {id} 
	 * @return: DATA
	 * @author: xuxihua
	 */
	selectById: async (id) => {
		let result = await Users.findOne({_id: id}).select('username name email avatar roles').exec()

		DATA.data.data = { ...result._doc }
		DATA.data.msg = '登录成功'
		return DATA
	},

	/**
	 * @description: 用户登录
	 * @param {data} 
	 * @return: DATA
	 * @author: xuxihua
	 */
	login: async (data) => {
		// 根据username查询单个数据
		let result = await Users.findOne({username: data.username}).select('_id username password').exec()
		if (!result) {
			DATA.data.data = {}
			DATA.data.msg = '用户尚未注册，请先注册'
			DATA.code = -1
		}else if (result.password !== data.password) {
			DATA.data.data = {}
			DATA.data.msg = '密码错误'
			DATA.code = -2
		}else {
			// 创建token
			let token = createToken(result, 'sign', '30 days')
			DATA.data.data = {
				username: result.username,
				_id: result._id,
				token: token
			}
			DATA.data.msg = '登录成功'
			DATA.code = 0
		}
		return DATA
	},
	
	/**
	 * @description: 用户注册
	 * @param {data} 
	 * @return: DATA
	 * @author: xuxihua
	 */ 
	register: async (data) => {
		// 查询用户是否存在
		let result = await Users.findOne({username: data.username}).exec()

		if (result) {
			DATA.data.data = {}
			DATA.data.msg = '用户已存在，请修改用户名'
			DATA.code = -1
		}else {
			result = await Users.create({
				...data,
				_id: mongoose.mongo.ObjectId()
			})
			result = await Users.findOne({username: data.username}).select('_id username name email avatar roles').exec();
			// 创建token
			let token = createToken(result, 'sign', '1 days')
			DATA.data.data = {
				...result._doc,
				token: token
			}
			DATA.data.msg = '注册成功'
			DATA.code = 0
		}
		return DATA
	}
}