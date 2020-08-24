<!--
 * @description: 
 * @param: 
 * @author: Fei
 * @return: 
 * @Date: 2020-08-21 12:09:30
-->
# myapp

> My wondrous Nuxt.js project

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).


### 开发过程中遇到的问题

> mongoose model 方法遇到的坑

```bash
  # 1、如果你的表的名称后缀没有s的话，在创建model时一定要加上第三个参数 ，如果没有第三个参数 mongoose会自动查找第一个参数加上s后的表名
   mongoose.model('articlelist', schema,'articlelist');

  # 2、如果你的表明里有驼峰写法  
```