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
  router.post('/api/task/add', controller.task.add); // app/controller/v1/comments.js
};

