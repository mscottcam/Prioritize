'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

// const {app, runServer, closeServer} = require('../index');
// const {DATABASE} = require('../config');

const should = chai.should();

// Fake test only to check that pathing in package.json is okay for server side testing
describe('Test', function () {
  it('should succeed', function () {
    true.should.be.true;
  });
});