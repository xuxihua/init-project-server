/*
 * @Description: user model
 * @Version: 1.0
 * @Author: xuxihua
 * @Date: 2020-04-18 10:23:18
 * @LastEditors: xuxihua
 * @LastEditTime: 2020-04-24 15:05:06
 */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // 使用 Node 自带 Promise 代替 mongoose 的 Promise

const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

// Schema
const usersSchema = new Schema({
	_id: { type: ObjectId }, // 默认生成，不加也可以
	username: { type: String, required: [true,'username不能为空'] },
	password: { type: String, required: [true,'password不能为空'] },
	name: { type: String, default: '' },
	email: { type: String, default: '' },
	avatar: { type: String, default: '' },
	roles: { type: String, default: '' }
})

// Model
const users = mongoose.model('user',usersSchema, 'user');

module.exports = users;
