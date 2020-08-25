/*
 * @description: 
 * @param: 
 * @author: Fei
 * @return: 
 * @Date: 2020-08-24 09:50:09
 */
const mongoose = require('mongoose');

const schema = mongoose.Schema({
	id:String,
	title: String, // 标题
	author: String, // 作者
	createTime: { type: Date, default: Date.now }, // 创建时间
	tab: String, // 标签
	likesNumber: String, // 点赞数量
	status: Number, // 当前状态
	category: String, // 类别
	oneReviewer: String, // 一审人
	oneAuditStatus: String, // 一审状态
	oneAuditTime: { type: Date }, // 一审操作时间
	twoReviewer: String, // 二审人
	twoAuditStatus: String, // 二审状态
	twoAuditTime: { type: Date }, // 二审操作时间
	finalReviewer: String, // 终审人
	finalAuditStatus: String, // 终审状态
	finalAuditTime: { type: Date }, // 终审操作时间
	publisher: String, // 发布人
	publishedStatus: String, // 发布状态
	published: { type: Date } // 发布操作时间
});

// statics：类上扩展
schema.statics.getData = function(parames = {}) {
	return this.model('articleLists').find(parames).exec();
};

schema.statics.deleteData = function(parames) {
	return this.model('articleLists').deleteMany(parames).exec()
}
const model = mongoose.model('articleLists', schema,"articleLists");
module.exports = model;
// const schema = mongoose.Schema({
//   name: String,
//   password: String,
//   cart: []
// });

// schema.statics.getCart = function(_id) {
//   return this.model("user")
//     .findById(_id)
//     .exec();
// };
