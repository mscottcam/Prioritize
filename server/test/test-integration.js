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
  displayName: 'Evan Harris',
  googleId: '113991032114835833364',
  accessToken:
    'ya29.GlvVBK1WhImxQgRZGD9yanjRErwHcEmY6aQy2IFvzLli7WHPGW4Fv4iy2y1DwagsW9Qb8FEOJm_CfclLUAbRzocyina4RvRLrx5_92c-6A7A2_pXZZyg7ItY2e8Z',
  mission: 'have a live working usable app soon!',
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
    let server = runServer(3001, secret.TEST_DATABASE);
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

  it('is a sandbox', function() {
    // seedSingleUser(singleTestUser)
    seedFakeUser(testUser)
      .then(user => {
      // console.log('Something: ------> ', user);
        return user;
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
    
    it('should return the current user', () => {
      // seedFakeUser(testUser)
      //   .then(user => {
      //     return user;
      //   });
      let resUser;  
      return chai.request(app)
        .get('/api/me')
        .set('Authorization', `Bearer ${testUser.accessToken}`)
        .send()
        .then(res => {
          let user = res.body;
          res.should.have.status(200);
          res.should.be.json;
          user._id.should.be.a('string');
          user.should.include.keys('displayName','googleId', 'accessToken', 'mission', 'roles');
          user.roles.should.be.a('array');
          user.roles.forEach(function(role) {
            role.should.be.a('object');
            role.should.include.keys('role','goals');
            role.goals.should.be.a('array');
            role.goals.forEach(function(goal) {
              goal.should.be.a('object');
              goal.should.include.keys('goal', 'tasks');
              goal.tasks.should.be.a('array');
              //test for the ref to tasks
            });
          });
          resUser = user;
          return User.findById(resUser._id);
        })
        .then(user => {
          console.log('user ========>',user.roles);
          console.log('resUser=========>', resUser.roles);
          resUser.displayName.should.equal(user.displayName);
          resUser.mission.should.equal(user.mission);
          resUser.googleId.should.equal(user.googleId);
          resUser._id.should.equal(user._id.toString());
          // resUser.roles.should.deep.equal(user.roles); <===== deconstruct this
        });
    });

    it('should return all tasks', function() {
      seedTaskData()
        .then(data => {
          console.log('Something: ------> ', data);
          return data;
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
    let resTask;
    it('should return tasks with right fields', function() {
      return chai
        .request(app)
        .get('/api/userData')
        .then(res => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.tasks.should.be.a('array');
          res.body.tasks.should.have.length.of.at.least(1);
          res.body.tasks.forEach(function(task) {
            task.should.be.a('object');
            task.should.include.keys('_id','userId','taskName','urgent', 'important', 'deadline');
          });
          resTask = res.body.tasks[0];
          return Task.findById(resTask.id);
        })
        .then(task => {
          resTask.userId.should.equal(task.userId);
          resTask.deadline.should.equal(task.deadline);
          resTask.important.should.equal(task.important);
          resTask.urgent.should.equal(task.urgent);
          resTask.taskName.should.equal(task.taskName);
        });
    });
  });

  describe('POST requests', () => {
    it.only('should add task to task collection', function() {
      const newTask = {
        userId: '59d64ed9c996510584f2fc32',
        taskName: 'graduate from Thinkful',
        deadline: '2017/11/29',
        important: true,
        urgent: true,
      };
      return chai
        .request(app)
        .post('/api/userData')
        .send(newTask)
        .then(function(res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys(
            'userId', 'taskName', 'deadline','important','urgent'
          );
          res.body.userId.should.equal(newTask.userId.toString());
          res.body.taskName.should.equal(newTask.taskName);
          res.body.deadline.should.equal(newTask.deadline);
          res.body.important.should.equal(newTask.important);
          res.body.urgent.should.equal(newTask.urgent);
          return Task.findById(res.body._id);
        })
        .then(function(task){
          let taskUserId =task.userId.toString();
          console.log('what is TAsk =======>',typeof(task.userId));
          console.log('what is TAsk =======>',typeof(newTask.userId));
          taskUserId.should.equal(newTask.userId);
          task.taskName.should.equal(newTask.taskName);
          task.deadline.should.equal(newTask.deadline);
          task.important.should.equal(newTask.important);
          task.urgent.should.equal(newTask.urgent); 
        });
    });
    // it('it should add reference to task in tasks array in userdb', function(){

    // });
    // it('should add new role if new role in req.body', function (){

    // });
    // it('should add new goal if new goal in req.body', function() {

    // });
    // it('should add mission to db', function() {

    // });

  });

  // describe('PUT requests', () => {});
  // it('should allow user to edit task)
});
