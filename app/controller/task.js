'use strict';
const Controller = require('egg').Controller;
//获取所有的task
class TaskController extends Controller {
    async get() {
        const { ctx } = this;
        let  getType = ctx.query.type
        const userId = ctx.params.id;
        const userInfo = await ctx.service.task.get(userId);
        ctx.body = userInfo;
    }
}
/*//创建一个task
exports.create =   async () => {

}
//修改
exports.update =   async () => {

}
//删除一个task
exports.delete =   async () => {

}*/


module.exports = TaskController;
