'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const { app, runServer, closeServer } = require('../index');
const keys = require('../config/keys');
const { User } = require('../models/user');

let secret = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  DATABASE: process.env.DATABASE,
  TEST_DATABASE: process.env.TEST_DATABASE
};

if (process.env.NODE_ENV !== 'production') {
  secret = require('../config/keys');
}

const should = chai.should();
chai.use(chaiHttp);

const testUser = {
  displayName: 'Evan Harris',
  googleId: '113991032114835833364',
  accessToken:
    'ya29.GlvVBK1WhImxQgRZGD9yanjRErwHcEmY6aQy2IFvzLli7WHPGW4Fv4iy2y1DwagsW9Qb8FEOJm_CfclLUAbRzocyina4RvRLrx5_92c-6A7A2_pXZZyg7ItY2e8Z'
};

const seedUserData = user => {
  return User.create(user);
};
const tearDownDatabase = () => {
  return new Promise((resolve, reject) => {
    mongoose.connection
      .dropDatabase()
      .then(result => {
        return resolve(result);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

describe('Life coach', () => {
  // Testing life cycle methods
  before(() => runServer(3001, secret.TEST_DATABASE));

  after(() => closeServer());

  beforeEach(() => {
    console.log('Hit this database: ', secret.TEST_DATABASE);
    // Use Promise all if we need to seed more data
    // return Promise.all([seedUserData(), seedOtherData()]);
    return seedUserData(testUser);
  });

  afterEach(() => {
    // delete whatever seeded data we do not want to persist to the next test
    return tearDownDatabase();
  });

  describe('Google authentication', () => {

    // Example User Query: 
    // User.findOne({ googleId: testUser.googleId }).then(_user => {
    //   console.log('User: ', _user);
    // });
    it('should redirect to google authentication', () => {
      chai.request(app)
        .get('/api/auth/google').redirects(0)
        .set('Authorization', `Bearer ${testUser.accessToken}`)
        .end((err, res) => {
          // Could maybe refactor this for loop in a fashiong similar to the logout test
          // where we look for the prescense of the googleUrl terminating in the '?'
          let googleUrl =''; 
          let currentChar;
          for (let i = 0; i < res.headers['location'].length; i++) {
            currentChar = res.headers['location'][i];
            if (currentChar !== '?') {
              googleUrl += currentChar;
            } else if (currentChar === '?') {
              break;
            }
          }
          res.should.have.status(302);
          googleUrl.should.equal('https://accounts.google.com/o/oauth2/v2/auth');
        });
    });

    it('should logout the user', () => {
      chai.request(app)
        .get('/api/auth/logout').redirects(0)
        .end((err, res) => {
          res.should.have.status(302);
          res.headers['location'].should.be.equal('/');
          res.headers['set-cookie'][0].should.contain('accessToken=;');
        });
    });
  });

  describe('GET requests', () => {});

  describe('POST requests', () => {});

  describe('PUT requests', () => {});

});