'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');
const { DATABASE, CLIENT_ID, CLIENT_SECRET, TEST_DATABASE } = require('../config');
const { app, runServer, closeServer } = require('../index');
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
  return {
    taskName: faker.lorem.word(),
    userId: '59d64ed9c996510584f2fc32',
    deadline: faker.lorem.word(),
    important: faker.random.boolean(),
    urgent: faker.random.boolean(),
    quadrantValue: faker.random.number()
  };
};

const seedTaskData = () => {
  const seedData = [];
  for (let i =0; i <= 5; i++ ) {
    seedData.push(generateTaskData());
  }
  return Task.insertMany(seedData);
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
  before(function() {
    return runServer(3001, secret.TEST_DATABASE);
  });

  beforeEach(function() {
    return Promise.all([seedFakeUser(testUser), seedTaskData()]);
  });

  afterEach(function() {
    return tearDownDatabase();
  });

  after(function() {
    return closeServer();
  });

  it('is a sandbox', function() {
    true.should.be.true;
  });

  describe('Google authentication', () => {
    it('should redirect to google authentication', () => {
      chai
        .request(app)
        .get('/api/auth/google')
        .redirects(0)
        .set('Authorization', `Bearer ${testUser.accessToken}`)
        .end((err, res) => {
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
        .set('Cookie', `accessToken=${testUser.accessToken}`)
        .redirects(0)
        .end((err, res) => {
          res.should.have.status(302);
          res.headers['location'].should.be.equal('/');
          res.headers['set-cookie'][0].should.contain('accessToken=;');
        });
    });
  });

  describe('GET requests', () => {
    it('should return the current user', () => {
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
            });
          });
          resUser = user;
          return User.findById(resUser._id);
        })
        .then(user => {
          resUser.displayName.should.equal(user.displayName);
          resUser.mission.should.equal(user.mission);
          resUser.googleId.should.equal(user.googleId);
          resUser._id.should.equal(user._id.toString());
        });
    });

    it('should return tasks with right fields', function() {
      let resTask;
      return chai
        .request(app)
        .get('/api/userData/59d64ed9c996510584f2fc32')
        .set('Authorization', `Bearer ${testUser.accessToken}`)
        .then(res => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.tasks.should.be.a('array');
          res.body.tasks.should.have.length.of.at.least(1);
          res.body.tasks.forEach(function(task) {
            task.should.be.a('object');
            task.should.include.keys('_id','userId','taskName','urgent', 'important', 'deadline', 'quadrantValue');
          });
          resTask = res.body.tasks[0];
          return Task.findById(resTask._id);
        })
        .then(task => {
          resTask._id.should.equal(task._id.toString());
          resTask.deadline.should.equal(task.deadline);
          resTask.important.should.equal(task.important);
          resTask.urgent.should.equal(task.urgent);
          resTask.taskName.should.equal(task.taskName);
          resTask.quadrantValue.should.equal(task.quadrantValue);
        });
    });
  });

  describe('POST requests', () => {
    it('should add task to task collection', function() {
      const newTask = {
        userId: '59d64ed9c996510584f2fc32',
        taskName: 'graduate from Thinkful',
        deadline: '2017/11/29',
        important: true,
        urgent: true,
      };
      return chai
        .request(app)
        .post('/api/userTask')
        .set('Authorization', `Bearer ${testUser.accessToken}`)
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
          taskUserId.should.equal(newTask.userId);
          task.taskName.should.equal(newTask.taskName);
          task.deadline.should.equal(newTask.deadline);
          task.important.should.equal(newTask.important);
          task.urgent.should.equal(newTask.urgent);
        });
    });
  });


  describe('PUT requests', () => {
    it('should add mission to db', function() {
      const testMission = {
        newMission: 'Enjoy life, be productive, build community',
        currentUser: {
          _id: 'userId'
        }
      };

      return User
        .findOne()
        .then(user => {
          testMission.currentUser._id = user._id;
          return chai
            .request(app)
            .put('/api/userMission')
            .set('Authorization', `Bearer ${testUser.accessToken}`)
            .send(testMission);
        })
        .then(function(res) {
          res.body.should.be.a('object');
          return User.findById(testMission.currentUser._id);
        })
        .then(function(user) {
          user.mission.should.equal(testMission.newMission);
        });

    });

    it('should allow user to edit task name, deadline, importance, urgency', function() {
      const taskUpdate = {
        taskName: 'test task',
        deadline: 'NOW',
        important: true,
        urgent: true
      };

      return Task
        .findOne()
        .then(task => {
          taskUpdate._id = task._id;
          return chai
            .request(app)
            .put('/api/userTask')
            .set('Authorization', `Bearer ${testUser.accessToken}`)
            .send(taskUpdate);
        })
        .then(function(res) {
          res.should.have.status(204);
          res.body.should.be.a('object');
          return Task.findById(taskUpdate._id);
        })
        .then(function(task) {
          task.taskName.should.equal(taskUpdate.taskName);
          task.deadline.should.equal(taskUpdate.deadline);
          task.important.should.equal(taskUpdate.important);
          task.urgent.should.equal(taskUpdate.urgent);
        });
    });

    it('should add new role if new role in req.body', function() {
      const newRole = {
        role: 'Developer'
      };

      return User
        .findOne()
        .then(user => {
          newRole._id = user._id;
          return chai
            .request(app)
            .put('/api/userData')
            .set('Authorization', `Bearer ${testUser.accessToken}`)
            .send(newRole);
        })
        .then(function(res) {
          res.should.have.status(204);
          res.body.should.be.a('object');
          return User.findById(newRole._id);
        })
        .then(function(user) {
          let roleMatch = user.roles.find(function(role) {
            return role.role === newRole.role;
          });
          roleMatch.role.should.equal(newRole.role);
        });
    });
  });

  describe('DELETE requests', () => {
    it('should delete a task by id', function() {
      let resTask;

      return Task
        .findOne()
        .then(function(task) {
          resTask = task;
          return chai
            .request(app)
            .delete(`/api/userTask/${resTask._id}`)
            .set('Authorization', `Bearer ${testUser.accessToken}`);
        })
        .then(function(res) {
          res.should.have.status(204);
          return Task.findById(resTask._id);
        })
        .then(function(task) {
          should.not.exist(task);
        });
    });
  });
});
