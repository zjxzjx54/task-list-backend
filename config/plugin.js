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
  }
};

exports.validate = {
  enable: true,
  package: 'egg-validate',
};
