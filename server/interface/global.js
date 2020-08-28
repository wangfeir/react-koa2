/*
 * @description: 
 * @param: 
 * @author: Fei
 * @return: 
 * @Date: 2020-08-26 14:48:56
 */
import Router from 'koa-router';
const url = require('url');

const ArticlelistModel = require('../dbs/models/articlelist');
// const koaBody = require('koa-body')({
//   multipart: true,  // 允许上传多个文件
// });
let required = [ 'title', 'author', 'category', 'content' ];

let router = new Router({
	prefix: '/global'
});
const requiredValidation = (required, data) => {
	const error = [];
	// 必填项验证
	required.forEach((item) => {
		if (!data[item]) {
			error.push(item);
		}
	});
	return error;
};
// 更新数据
router.post('/updateData', async (ctx) => {
	const rb = await ctx.request.body;
	// 必填验证
	const error = requiredValidation(required, rb);
	if (error.length > 0) {
		console.log('创建错误', error);
		ctx.body = {
			status: 400,
			data: `${error.join(',')} 数据不能为空!`
		};
	} else {
    rb.updateTime =new Date().getTime();
    console.log('更新时间',rb.updateTime);
		rb.status = 'create';
		try {
			let ret = await ArticlelistModel.updateData(rb);
			console.log('更新数据', ret);
			ctx.body = {
				status: 200,
				data: ret
			};
		} catch (e) {
			ctx.body = {
				status: 400,
				data: e
			};
		}
	}
});

// 创建数据
router.post('/createData', async (ctx) => {
	const rb = await ctx.request.body;
	if (!rb) {
		ctx.body = {
			status: 400,
			data: '接收数据错误'
		};
		return false;
	} else {
		// 必填验证
		const error = requiredValidation(required, rb);
		if (error.length > 0) {
			console.log('创建错误', error);
			ctx.body = {
				status: 400,
				data: `${error.join(',')} 数据不能为空!`
			};
		} else {
			// 创建数据
			rb.createTime =  new Date().getTime();
			rb.status = 'create';
			try {
				let ret = await ArticlelistModel.saveData(rb);
				ctx.body = {
					status: 200,
					data: ret
				};
			} catch (e) {
				ctx.body = {
					status: 400,
					data: e
				};
			}
		}
	}

	// const rbs =await ctx.request
	console.log('创建数据', rb, rb.title);
	// console.log('创建数据1',rbs)
});

export default router;
