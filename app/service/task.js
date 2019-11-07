const Service = require('egg').Service;

class TaskService extends Service {
  async get(uid, taskType) {
    if(taskType === 'process'){

    }else if(taskType === 'finished'){

    }else if(taskType === 'timeout'){

    }
    const tasks = await this.app.mysql.get('users', { id: 11 });
    return { tasks };
  }
}

module.exports = TaskService
