const md5 = require('md5');
const Service = require('egg').Service;

class UserService extends Service {
  async find(email, password) {
    password = md5(password);
    const user = await this.app.mysql.get('note_user', { email });
    return user;
  }

  async add(email, username, password) {
    password = md5(password);
    const isExist = await this.app.mysql.get('note_user',{ email });
    console.log("isExist", isExist);
    if(!isExist.id){
      const newUser = await this.app.mysql.insert('note_user', {
        user_name: username,
        email, password
      });
      return newUser
    }
    else{
      return "邮箱重复"
    }
  }
}

module.exports = UserService;
