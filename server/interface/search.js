/*
 * @description: 
 * @param: 
 * @author: Fei
 * @return: 
 * @Date: 2020-08-21 14:46:23
 */

import Router from 'koa-router';
// const { MongoClient } = require('mongodb');
const url  = require('url');

const ArticlelistModel = require('../dbs/models/articlelist'); /* 引入产品列表的数据库模型 */

let router = new Router({
	prefix: '/list'
});


// 删除数据
router.delete('/delete',async (ctx)=>{
	let requsetUrl = ctx.url;
	let params = url.parse(requsetUrl, true).query
	params['_id'] = params['_id'].split(',');
	let length = params['_id'].length;
	let deleteParams;
	if(!length){
		ctx.body = {
			status: 400,
			data: '请选择数据!'
		};
		return false
	}
	if(length&&length>1){
		deleteParams = { _id: { $in: params['_id'] } } // 删除多条数据方法
	}else{
		deleteParams = params
	}
	let ret = await ArticlelistModel.deleteData(deleteParams)
	console.log('删除数据',ret)
	if(length===ret.deletedCount){
		ctx.body = {
			status: 200,
			data: 'success'
		};
	}else{
		ctx.body = {
			status: 400,
			data: ret
		};
	}
})
// 获取数据
router.get('/search', async (ctx) => {
	// // 添加文档
	let requsetUrl = ctx.url;
	let findData = url.parse(requsetUrl, true).query
	const {pageSize,current} = findData
	let paramsData = JSON.parse(findData.data)
	let params = {}
	for (const key in paramsData) {
		if (paramsData[key]) {
			params[key] = {$regex: paramsData[key], $options: '$i'} // $options: '$i' 不区分大小写
		}
	}
	console.log('请求的参数',ctx,params)
  // let ret = await Model.find();
	console.time('start2333')
	
	let ret = await ArticlelistModel.getData(params,pageSize,current)
	let total = await ArticlelistModel.getDataCount(params)
	console.log('total数量',total)
  console.timeEnd('start2333')
	// console.log('插入文档111',ret)
	ctx.body = {
		status: 200,
		data: ret,
		total
	};
});

export default router;
