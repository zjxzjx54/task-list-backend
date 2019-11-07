const md5  = require('md5');
const Service = require('egg').Service;
class UserService extends Service {
  async find(email,password) {


    password = md5(password);
    console.log("email",email);
    console.log("password",password);

    const user = await this.app.mysql.get('note_user', { email });

    console.log("user",user)
    return user;
  }
}

module.exports = UserService
