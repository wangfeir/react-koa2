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
  password:String
})

schema.statics.getData = function(){
  return this.model('users').find({}).exec()
}
schema.statics.updateData = function(parames){
	// console.log(parames['_id'],this.model('articleLists').findByIdAndUpdate(parames['_id'],parames))
	return this.model('users').findByIdAndUpdate(parames['_id'],parames).exec()

}

const model = mongoose.model('users',schema,'users');
module.exports = model;