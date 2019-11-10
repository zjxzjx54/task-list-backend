const Service = require('egg').Service;

class TaskService extends Service {
  async get(uid, taskType) {
    let result;
    if(taskType === 'process'){
      result = await this.app.mysql.query("select * from note_task where userId = ? AND is_finished = ?",[uid,0]);
    }else if(taskType === 'finish'){
      result = await this.app.mysql.query("select * from note_task where userId = ? AND is_finished = ?",[uid,1]);
    }
    return result;
  }

  async add(task){
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

module.exports = TaskService
