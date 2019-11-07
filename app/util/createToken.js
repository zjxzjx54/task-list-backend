const config = require('../../config/baseConfig')
const jwt = require('jsonwebtoken')

//return token
module.exports = (userId)=>{
  let privateKey = config.jwt.secret;
  let expiresIn = config.jwt.expiresIn;
  const token = jwt.sign({id:userId},privateKey,{expiresIn})

  return token;
}
