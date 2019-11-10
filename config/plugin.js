'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  mysql:{
    enable: true,
    package: 'egg-mysql',
  },
  'egg-validate':{
    enable: true,
    package: 'egg-validate',
  },
  cors: {
    enable: true,
    package: 'egg-cors'
  }
};

/*exports.validate = {
  enable: true,
  package: 'egg-validate',
};*/
