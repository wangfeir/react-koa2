/*
 * @description: 
 * @param: 
 * @author: Fei
 * @return: 
 * @Date: 2020-08-30 13:37:12
 */
const mongoose = require('mongoose');
const schema = mongoose.Schema({
  id:String,
  userid:String,
  email:String,
  phone:Number,
  power:String,
  logingtime:Number,
})

schema.statics.getData = function(){
  return this.model('users').find({}).exec()
}

const model = mongoose.model('users',schema,'users');
module.exports = model;