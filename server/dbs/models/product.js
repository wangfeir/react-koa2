/*
 * @description: 
 * @param: 
 * @author: Fei
 * @return: 
 * @Date: 2020-08-24 09:50:09
 */
const mongoose = require('mongoose');

const schema = mongoose.Schema({
	title: String, // 标题
	author: String, // 作者
	createTime: { type: Date, default: Date.now }, // 创建时间
	tab: String, // 标签
	likesNumber: String, // 点赞数量
	status: String, // 当前状态
	category: String, // 类别
	oneReviewer: String, // 一审人
	oneAuditStatus: String, // 一审状态
	oneAuditTime: { type: Date }, // 一审操作时间
	twoReviewer: String, // 一审人
	twoAuditStatus: String, // 一审状态
	twoAuditTime: { type: Date }, // 一审操作时间
	finalReviewer: String, // 一审人
	finalAuditStatus: String, // 一审状态
	finalAuditTime: { type: Date }, // 一审操作时间
	publisher: String, // 一审人
	publishedStatus: String, // 一审状态
	published: { type: Date } // 一审操作时间
});
// author: "作者"
// category: "类别"
// createTime: "2020-08-24T06:12:03.000Z"
// finalAuditStatus: "最终状态"
// finalAuditTime: "2020-08-24T06:12:03.000Z"
// finalReviewer: "最终审核人"
// likesNumber: 123
// oneAuditStatus: "一审状态"
// oneAuditTime: "2020-08-24T06:12:03.000Z"
// oneReviewer: (...)
// published: "2020-08-24T06:12:03.000Z"
// publishedStatus: "发布状态"
// publisher: "发布人"
// status: 2
// tab: "标签"
// title: "标题"
// twoAuditStatus: "二审状态"
// twoAuditTime: "2020-08-24T06:12:03.000Z"
// twoReviewer: "二审人"

// statics：类上扩展
schema.statics.getData = function(parames = {}) {
	return this.model('articlelists').find(parames).exec();
};

const model = mongoose.model('articlelists', schema);
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
