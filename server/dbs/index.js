const dbConfig = require('./config');

const mongoose = require("mongoose");
// 1.连接
mongoose.connect(`${dbConfig.url}/${dbConfig.dbName}`, { useNewUrlParser: true });
const conn = mongoose.connection;
conn.on("error", () => console.error("连接数据库失败"));