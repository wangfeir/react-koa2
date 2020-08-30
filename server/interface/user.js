/*
 * @description: 
 * @param: 
 * @author: Fei
 * @return: 
 * @Date: 2020-08-30 13:43:45
 */
import Router from 'koa-router';
const url = require('url')

const UsersModel = require('../dbs/models/users')

let router = new Router({
  prefix:'/user'
})


router.post('/getList',async (ctx) =>{
  console.log('进入接口')
  let data =await UsersModel.getData();
  console.log('获取数据接口',data)
  ctx.body={
    status:200,
    data,
  }
})

export default router;