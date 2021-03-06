/*
 * @description: 
 * @param: 
 * @author: Fei
 * @return: 
 * @Date: 2020-08-30 13:43:45
 */
import Router from 'koa-router';
import { connect } from 'http2';
const url = require('url')

const UsersModel = require('../dbs/models/users')

let router = new Router({
  prefix:'/user'
})

router.post('/changePassword',async (ctx)=>{
  let rb = ctx.request.body
  console.log('修改密码',rb)
  // const error = requiredValidation(['password'], rb);
	// if (error.length > 0) {
	// 	console.log('创建错误', error);
	// 	ctx.body = {
	// 		status: 400,
	// 		data: `${error.join(',')} 数据不能为空!`
	// 	};
	// }else{
    try{
      let ret = await UsersModel.updateData(rb);
      ctx.body={
        status:200,
        ret,
      }
    }catch(e){

    }

  // } 
})
router.post('/getList',async (ctx) =>{
  console.log('进入接口')
  let findData = ctx.request.body
  const {pageSize,current,status} = findData

  let data =await UsersModel.getData();
  let total =await UsersModel.getDataCount();
  console.log('获取数据接口',data)
  
  ctx.body={
    status:200,
    data,
    total:Number(total),
    pageSize:Number(pageSize),current:Number(current)

  }
})

export default router;