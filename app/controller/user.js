'use strict';
const createToken = require('../util/createToken');
const md5 = require('md5');
const Controller = require('egg').Controller;

class UserController extends Controller {
    async login() {
        const { ctx } = this;
        const {email,password} = this.ctx.request.body;
        if(email === "" || password === ""){
            ctx.success({
                msg:'用户名或密码为空',
                success:false,
            });
            return
        }
        const result = await ctx.service.user.find(email,password);

        if(result){
            if(md5(password) === result.password){
                let token = createToken(result.id);
                ctx.success({
                    msg: '登录成功',
                    data: {
                        userId: result.id,
                        username: result.user_name,
                        email:result.email,
                        token,
                    },
                    success:true,
                });
            }
            else{
                ctx.success({
                    msg:'密码错误',
                    success:false,
                })
            }
        }
        else{
            console.log(4444);
            ctx.success({
                msg:'用户名不存在',
                success:false,
            });
        }

    }
    async signup(){
        const { ctx } = this;
        const {email,password,username} = this.ctx.request.body;
        try{
            ctx.validate({
                email:{type:'string',require:true},
                password:{type:'string',require:true},
                username:{type:'string',require:true},
            }, ctx.request.body)
            let result  = await ctx.service.user.add(email,password,username)
            if(result === "邮箱重复"){
                ctx.success({
                    msg:'邮箱重复',
                    success:false,
                })
            }
            else{
                if(result.affectedRows  === 1){
                    ctx.success({
                        msg: "创建新用户成功!",
                        success:true,
                    })
                }else{
                    ctx.success({
                        msg: "创建用户失败",
                        success:false,
                    })
                }
            }
        }catch(err){
            ctx.success({
                msg: err,
                success:false,
            });
        }
    }
}

module.exports = UserController;
