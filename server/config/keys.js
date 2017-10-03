'use strict';

if (process.env.NODE_ENV === 'production') {
  console.log('hi friends. this is the production node', process.env.NODE_ENV);
  // we are in production
  module.exports = require('./prod');
} else {
  console.log('hi friends. this is the development node', process.env.NODE_ENV);
  // we are in development
  module.exports = require('./secret');
}