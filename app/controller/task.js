'use strict';
const Controller = require('egg').Controller;
//获取所有的task
class TaskController extends Controller {
    async get() {
        const { ctx } = this;
        const {uid,type} = ctx.query;
        const list = await ctx.service.task.get(uid,type);
        if(list){
            ctx.success({
                msg:'Success',
                success:true,
                data:list,
            })
        }else{
            ctx.success({
                msg: '数据错误',
                data: {
                    message:"数据错误"
                },
                success:false,
            });
        }
    }

    async add() {
        const {ctx} = this;

        try {
            ctx.validate({
                title:{type:'string',require:true},
                note:{type:'string',require:true},
                tag:{type:'string',require:true},
                start_date:{type:'string',require:true},
                end_date:{type:'string',require:true},
                status:{type:'string',require:true},
            },ctx.request.body);
            console.log(111111);
            const result = await ctx.service.task.add(ctx.request.body);
            if(result.affectedRows  === 1){
                ctx.success({
                    msg:'新增任务成功',
                    success:true
                })
            }else
                throw "新增任务失败"
        }catch(err){
            console.log("err", err);
            console.log(222222);
            ctx.success({
                msg: '数据错误',
                data: {
                   message:err
                },
                success:false,
            });
        }

    }
}

module.exports = TaskController;
