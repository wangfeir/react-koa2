/*
 * @description: 
 * @param: 
 * @author: Fei
 * @return: 
 * @Date: 2020-08-21 14:46:23
 */

import Router from 'koa-router';
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const dbConfig = require('../dbs/config');
mongoose.connect(dbConfig.url, { useNewUrlParser: true });

const conn = mongoose.connection;
conn.on('error', () => console.error('数据库链接失败！'));

const Schema = mongoose.Schema({
	name: String,
	price: Number,
	category: String
});

// 创建model 
const Model = mongoose.model('fruits', Schema);
let router = new Router({
	prefix: '/search'
});

router.get('/all', async (ctx) => {
	// // 添加文档
	// ret = await fruits.find()
	let ret = await Model.find();
	console.log('插入文档', ret);
	// console.log('插入文档',JSON.stringify(ret))
	ctx.body = {
		status: 200,
		data: ret
	};
});

export default router;
