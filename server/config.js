'use strict';
require('dotenv').config();

exports.CLIENT_ID = process.env.CLIENT_ID || global.CLIENT_ID;
exports.CLIENT_SECRET = process.env.CLIENT_SECRET || global.CLIENT_SECRET;
exports.DATABASE = process.env.DATABASE || global.DATABASE;
exports.TEST_DATABASE = process.env.TEST_DATABASE || global.TEST_DATABASE;
