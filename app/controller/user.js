'use strict';
const createToken = require('../util/createToken');
const md5 = require('md5');
const Controller = require('egg').Controller;

class UserController extends Controller {
    async login() {
        const { ctx } = this;
        const {email,password} = this.ctx.request.body;
        if(email === "" || password === ""){
            ctx.throw(400, '用户名或密码不能为空!');
            return
        }
        const result = await ctx.service.user.find(email,password);
        console.log("result",result);
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
        }else{
            console.log(4444);
            ctx.success({
                msg:'用户名不存在',
                success:false,
            });
        }

    }
}

module.exports = UserController;
