'use strict';
require('dotenv').config();

exports.CLIENT_ID = process.env.CLIENT_ID,
exports.CLIENT_SECRET = process.env.CLIENT_SECRET,
exports.DATABASE = process.env.DATABASE,
exports.TEST_DATABASE = process.env.TEST_DATABASE;

// module.exports = {
//   CLIENT_ID: process.env.CLIENT_ID,
//   CLIENT_SECRET: process.env.CLIENT_SECRET,
//   DATABASE: process.env.DATABASE,
//   TEST_DATABASE: process.env.TEST_DATABASE
// };