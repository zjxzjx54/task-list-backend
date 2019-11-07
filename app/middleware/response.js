module.exports = options => {
  return async function response(ctx, next) {
    ctx.success = ({data,msg,total,success})=>{
      console.log(122212312);
      ctx.body = {code:200,data,msg,total,success};
      console.log(123123);
    };
    //传递给下一个中间件
    await next();
  };
};
