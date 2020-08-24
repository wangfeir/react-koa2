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
// mongoose.connect(dbConfig.url, { useNewUrlParser: true });

// const conn = mongoose.connection;
// conn.on('error', () => console.error('数据库链接失败！'));

const ProductModel = require('../dbs/models/product'); /* 引入产品列表的数据库模型 */

// const Schema = mongoose.Schema({
// 	name: String,
// 	price: Number,
// 	category: String
// });

// 创建model 
// const Model = mongoose.model('fruits', Schema);
let router = new Router({
	prefix: '/search'
});

// router.get('/all', async (ctx) => {
//   console.time('start1')
// 	// // 添加文档
//   // let ret = await Model.find();

//   const client = new MongoClient(
//     'mongodb://localhost:27017',
//     // 'mongodb://127.0.0.1:27017',
//     {
//       useNewUrlParser: true // 指定在url中识别用户的认证信息
//     }
//   )
//   let ret
//   // // 创建连接
//   ret = await client.connect()
//   // console.log('ret',ret)

//   const db = client.db('test')

//   const product = db.collection('articleLists')
// 	// //  console.log('插入文档', product.find({}));



//   let rets = await product.find().toArray()
//   // let ret = await ProductModel.getData()
//   console.timeEnd('start1')
// 	// console.log('插入文档', rets);
// 	ctx.body = {
// 		status: 200,
// 		data: rets
// 	};
// });
router.get('/all', async (ctx) => {
	// // 添加文档
  // let ret = await Model.find();
  console.time('start2333')
  let ret = await ProductModel.getData()
  console.timeEnd('start2333')
	console.log('插入文档111',ret)
	ctx.body = {
		status: 200,
		data: ret
	};
});

export default router;
