/*
 * @description: 
 * @param: 
 * @author: Fei
 * @return: 
 * @Date: 2020-08-21 17:20:44
 */
const dbConfig = require('./config');

const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false)

// 1.连接
mongoose.connect(`${dbConfig.url}/${dbConfig.dbName}`, { useNewUrlParser: true });
const conn = mongoose.connection;
conn.on("error", () => console.error("连接数据库失败"));