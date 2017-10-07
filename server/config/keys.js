'use strict';
require('dotenv').config();
exports.CLIENT_ID = process.env.CLIENT_ID || global.CLIENT_ID;
exports.CLIENT_SECRET = process.env.CLIENT_SECRET || global.CLIENT_SECRET;
exports.DATABASE = process.env.DATABASE || global.DATABASE;
exports.TEST_DATABASE = process.env.TEST_DATABASE || global.TEST_DATABASE;
// console.log('What does process.env look like in travis mate?: ', process.env);
console.log("we in here", process.env)
if (process.env.NODE_ENV === 'production') {
  // we are in production
  module.exports = require('./prod');
} else {
  // we are in development
  // module.exports = require('./secret');
}