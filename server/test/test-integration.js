'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');

const { app, runServer, closeServer } = require('../index');

const {
  DATABASE,
  CLIENT_ID,
  CLIENT_SECRET,
  TEST_DATABASE
} = require('../config/keys');

const { User } = require('../models/user');
const { Task } = require('../models/task');

const should = chai.should();
chai.use(chaiHttp);

let secret = {
  CLIENT_ID,
  CLIENT_SECRET,
  DATABASE,
  TEST_DATABASE
};

// Update test user with real tasks _id reference after creating tasks post
const testUser = {
  displayName: 'Evon Harris',
  googleId: '113991032114835833364',
  accessToken:
    'ya29.GlvVBK1WhImxQgRZGD9yanjRErwHcEmY6aQy2IFvzLli7WHPGW4Fv4iy2y1DwagsW9Qb8FEOJm_CfclLUAbRzocyina4RvRLrx5_92c-6A7A2_pXZZyg7ItY2e8Z',
  roles: [
    {
      role: 'Dad',
      goals: [
        {
          goal: 'Make delicious breakfast',
          tasks: this.tasks 
        }
      ]
    }
  ]
};

const seedFakeUser = user => {
  return User.create(user);
};

const generateTaskData = () => {
  console.log('Generating task data');
  return {
    taskName: faker.lorem.word(),
    userId: '59d64ed9c996510584f2fc32',
    deadline: faker.lorem.word(),
    important: faker.random.boolean(),
    urgent: faker.random.boolean()
  };
};

const seedTaskData = () => {
  const seedData = [];

  for (let i =0; i <= 5; i++ ) {
    // console.log('generate task data', generateTaskData());
    seedData.push(generateTaskData());
  }
  return Task.insertMany(seedData);
};
// console.log("Data", seedTaskData());

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
  before(function() {
    console.log('hello');
    let server = runServer(3001, secret.DATABASE);
    console.log('Da server: ', server);
    return server;
  });


  beforeEach(function() {
    // Use Promise all if we need to seed more data
    // return Promise.all([seedUserData(), seedOtherData()]);
    // console.log('do i work');
    // return seedFakeUser(testUser);
    // return Promise.all([seedFakeUser(testUser), seedTaskData()]);
  });

  afterEach(function() {
    // console.log('What does our data look like: ');
    // return tearDownDatabase();
  });
  after(function() {
    return closeServer();
  });

  // delete whatever seeded data we do not want to persist to the next test

  it('is a sandbox', function() {
    // seedSingleUser(singleTestUser)
   
    seedFakeUser(testUser)
      .then(user => {
      // console.log('Something: ------> ', user);
      return user
    });
    

    let resUser;
    return chai
      .request(app)
      .get('/api/users')
      .then(res => {
        resUser = res;
        res.should.have.status(200);
        console.log('Res: ', res.body);
      });

  });

  describe('Google authentication', () => {
    // Example User Query:
    // User.findOne({ googleId: testUser.googleId }).then(_user => {
    //   console.log('User: ', _user);
    // });
    it('should redirect to google authentication', () => {
      chai
        .request(app)
        .get('/api/auth/google')
        .redirects(0)
        .set('Authorization', `Bearer ${testUser.accessToken}`)
        .end((err, res) => {
          // Could maybe refactor this for loop in a fashiong similar to the logout test
          // where we look for the prescense of the googleUrl terminating in the '?'
          let googleUrl = '';
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
          googleUrl.should.equal(
            'https://accounts.google.com/o/oauth2/v2/auth'
          );
        });
    });

    it('should logout the user', () => {
      chai
        .request(app)
        .get('/api/auth/logout')
        .redirects(0)
        .end((err, res) => {
          res.should.have.status(302);
          res.headers['location'].should.be.equal('/');
          res.headers['set-cookie'][0].should.contain('accessToken=;');
        });
    });
    it('should return the current user', () => {
      return chai.request(app)
        .get('/api/me')
        .set('Authorization', `Bearer ${testUser.accessToken}`)
        .send()
        .then(res => {
          console.log('Ok');
          let user = res.body;
          res.should.have.status(200);
          res.should.be.json;
          user.id.should.be.a('number');
          user.user_id.should.be.equal('43214');
          user.first_name.should.be.equal('Jimmy');
          user.last_name.should.be.equal('BlueJeans');
        });
    });
  });

  describe('GET requests', () => {
    it('should return all users', function() {
      let res;
      return chai
        .request(app)
        .get('/api/users')
        .then(_res => {
          res = _res;
          res.should.have.status(200);
        });
    });

    it('should return all tasks', function() {

      seedTaskData()
        .then(data => {
        console.log('Something: ------> ', data);
        return data
        });
      let resTask;
      return chai
        .request(app)
        .get('/api/userData')
        .then(res => {
          resTask = res;
          res.should.have.status(200);
          res.should.be.json;
          // console.log('What is res: ', res.body);
          return Task.count();
        })
        .then(count => {
          console.log('RES TASK BODY TASKS ----->', resTask.body.tasks)
          // console.log('This should be the number of tasks in the db: ', count)
          // console.log('Response test side', resTask.body);
          resTask.body.tasks.should.have.lengthOf(count);
        });
    });

    it.only()
  });

  // describe('POST requests', () => {});

  // describe('PUT requests', () => {});
});
