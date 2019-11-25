'use strict';
const checkToken = require('./middleware/checkToken')
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  //router.get('/', controller.home.index);
/*  router.get('/', controller.home);
  router.get('/user/:id', controller.user.page);
  router.post('/admin', isAdmin, controller.admin);
  router.post('/user', isLoginUser, hasAdminPermission, controller.user.create);*/
  router.post('/login',controller.user.login);
  router.post('/signup',controller.user.signup);
  router.post('/api/task/add',checkToken ,controller.task.add);
  router.get('/api/task/get',checkToken ,controller.task.get);
  router.post('/api/task/delete',checkToken ,controller.task.delete);
  router.post('/api/task/update',checkToken ,controller.task.update);
  router.post('/api/task/filter',checkToken ,controller.task.filter);
};

