'use strict';

require('dotenv').config();
exports.CLIENT_ID = process.env.CLIENT_ID || global.CLIENT_ID || '181298905302-j478c09tjhinh35oh0gigkdk410t3trj.apps.googleusercontent.com';
exports.CLIENT_SECRET = process.env.CLIENT_SECRET || global.CLIENT_SECRET || '8aSA2Q2DUZ4k4zVNR95u0htU';
exports.DATABASE = process.env.DATABASE || global.DATABASE || 'mongodb://dev:password@ds155414.mlab.com:55414/life-coach';
exports.TEST_DATABASE = process.env.TEST_DATABASE || global.TEST_DATABASE || 'mongodb://dev:password@ds157444.mlab.com:57444/prioritize-test';