/*
 * @description: 
 * @param: 
 * @author: Fei
 * @return: 
 * @Date: 2020-08-21 14:46:23
 */

import Router from 'koa-router'

let router = new Router({
  prefix: '/search'
})

router.get('/all',async (ctx) => {
  console.log(`正在请求接口all`,ctx)
  ctx.body={
    status:200
  }
})

export default router
