const Service = require('egg').Service;
const moment = require('moment');
class TaskService extends Service {
  async get(uid, taskType) {
    let result;
    if(taskType === 'process'){
      result = await this.app.mysql.query("select * from note_task where userId = ? AND is_finished = ? AND is_delete = ? ORDER BY id desc",[uid,0,0]);
    }else if(taskType === 'finish'){
      result = await this.app.mysql.query("select * from note_task where userId = ? AND is_finished = ? AND is_delete = ? ORDER BY id desc",[uid,1,0]);
    }else if (taskType === 'timeout'){
      let today = moment().format("YYYY-MM-DD");
      console.log("today", today);
      result = await this.app.mysql.query("select * from note_task where is_finished = 0 AND is_delete = 0 AND end_date < ?",[today]);
    }
    return result;
  }

  async add(task){
    let  isExist = await this.app.mysql.query("select * from note_task where title = ? " ,[task.title]);

    if(isExist.length === 1){
        throw "标题重复!"
    }else{
      const result = await this.app.mysql.insert('note_task', {
        title: task.title,
        note: task.note,
        status: task.status,
        tag: task.tag,
        start_date: task.start_date,
        end_date: task.end_date,
        userId:task.userId
      });
      return result
    }
  }
  async update(task){
    const result = await this.app.mysql.update('note_task', {
      title: task.title,
      note: task.note,
      status: task.status,
      tag: task.tag,
      start_date: task.start_date,
      end_date: task.end_date,
      userId:task.userId,
      id:task.id,
    });
    return result
  }
  async delete(userId,id){
    let result = await this.app.mysql.query("update note_task set is_delete = 1 where userId = ? AND id = ? ", [userId,  id]);
    console.log("result", result);
    return result;
  }
  async filter(userId,title,type,start_date, end_date){
    let result = {process:[], finished:[],timeout:[]}, today = moment().format("YYYY-MM-DD");
    if(type === 'process'){
      result.process = await this.app.mysql.query("select * from note_task where is_finished = 0 AND is_delete = 0 AND start_date >= ? AND end_date <= ? AND userId = ?",[start_date, end_date,userId])
    }else if(type === 'finished'){
      result.finished = await this.app.mysql.query("select * from note_task where is_finished = 1 AND is_delete = 0 AND start_date >= ? AND end_date <= ? AND userId = ?",[start_date, end_date,userId])
    }else if(type === 'timeout'){
      result.timeout = await this.app.mysql.query("select * from note_task where is_finished = 0 AND is_delete = 0 AND end_date < ? AND userId = ?",[today,userId]);
    }else if(type === 'all'){
      result.process = await this.app.mysql.query("select * from note_task where is_finished = 0 AND is_delete = 0 AND start_date >= ? AND end_date <= ? AND userId = ?",[start_date, end_date,userId])
      result.finished = await this.app.mysql.query("select * from note_task where is_finished = 1 AND is_delete = 0 AND start_date >= ? AND end_date <= ? AND userId = ?",[start_date, end_date,userId]);
      result.timeout = await this.app.mysql.query("select * from note_task where is_finished = 0 AND is_delete = 0 AND end_date < ? AND userId = ?",[today,userId]);
    }
    return result
  }
}

module.exports = TaskService
