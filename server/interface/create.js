/*
 * @description: 
 * @param: 
 * @author: Fei
 * @return: 
 * @Date: 2020-08-26 14:48:56
 */
import Router from 'koa-router';
const url = require('url')
const ArticlelistModel = require('../dbs/models/articlelist')
// const koaBody = require('koa-body')({
//   multipart: true,  // 允许上传多个文件
// });

let router = new Router({
  prefix:'/global'
})

router.post('/createData',async (ctx)=>{
  const rb = await ctx.request.body;
  if(!rb){
    ctx.body = {
      status: 400,
      data: '接收数据错误'
    };
    return false 
  }else{
    let required = ['title','author','category','content']
    const error = []
    // 必填项验证
    required.forEach(item=>{
      if(!rb[item]){
        error.push(item)
      }
    })
    if(error.length>0){
      console.log('创建错误',error)
      ctx.body = {
        status: 400,
        data: `${error.join(',')} 数据不能为空!`
      };
    }else{
      // 创建数据
      rb.createTime = Date.parse(new Date());
      rb.status = 'create';
      try {
        let ret = await ArticlelistModel.saveData(rb);
        ctx.body = {
          status: 200,
          data: ret
        };
      } catch(e) {
        ctx.body = {
          status: 400,
          data: e
        };
      }
    }
    
  }

  // const rbs =await ctx.request
  console.log('创建数据',rb,rb.title)
  // console.log('创建数据1',rbs)

})

export default router;
