module.exports = options => {
  return async function response(ctx, next) {
    ctx.success = ({data,msg,total,success})=>{
      ctx.body = {code:200,data,msg,total,success};
    };
    //传递给下一个中间件
    await next();
  };
};
