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
        const {userId} = ctx.request.body;
        try {
            ctx.validate({
                title:{type:'string',require:true},
                note:{type:'string',require:true},
                tag:{type:'string',require:true},
                start_date:{type:'string',require:true},
                end_date:{type:'string',require:true},
                status:{type:'string',require:true},
            },ctx.request.body);
            const result = await ctx.service.task.add(ctx.request.body);
            if(result.affectedRows  === 1){
                let list = await ctx.service.task.get(userId,"process");
                if(list){
                    ctx.success({
                        msg:'新增任务成功',
                        success:true,
                        data:list,
                    })
                }
                else{
                    ctx.success({
                        msg:'获取任务列表失败!',
                        success:false,
                    })
                }

            }
            else
                throw "新增任务失败"
        }catch(err){

            ctx.success({
                msg: err,
                success:false,
            });
        }

    }
    async update() {
        const {ctx} = this;
        const {userId} = ctx.request.body;
        try {
            ctx.validate({
                title:{type:'string',require:true},
                note:{type:'string',require:true},
                tag:{type:'string',require:true},
                start_date:{type:'string',require:true},
                end_date:{type:'string',require:true},
                status:{type:'string',require:true},
            },ctx.request.body);
            const result = await ctx.service.task.update(ctx.request.body);
            if(result.affectedRows === 1){
                ctx.success({
                    msg:'更新任务成功',
                    success:true,
                })
            }
            else
                throw "更新任务失败"
        }catch(err){
            ctx.success({
                msg: err,
                success:false,
            });
        }

    }
    async delete(){
        const {ctx} = this;
        const {userId,taskId} = ctx.request.body;
        try{
            ctx.validate({
                userId:{type:'number',require:true},
                taskId:{type:'number',require:true},
            },ctx.request.body);
            const result = await ctx.service.task.delete(userId, taskId);
            if(result.affectedRows  === 1){
                ctx.success({
                    msg:'删除成功',
                    success:true,
                    data:null,
                })
            }else{
                throw "删除数据失败"
            }
        }catch(err){
            ctx.success({
                msg: err,
                success:false,
            });
        }
    }
    async filter(){
        const {ctx} = this;
        const {userId,title,type,start_date, end_date} = ctx.request.body;
        try {
            ctx.validate({
                userId:{type:'number',require:true},
                start_date:{type:'string',require:true},
                end_date:{type:'string',require:true},
            },ctx.request.body);
            const result = await ctx.service.task.filter(userId,title,type,start_date, end_date)
            ctx.success({
              msg:'查询成功!',
              success:true,
              data:result
            })
        }catch(err){
            ctx.success({
                msg:err,
                success:false
            })
        }
    }
}

module.exports = TaskController;
