'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const { app, runServer, closeServer } = require('../index');

const { DATABASE, CLIENT_ID, CLIENT_SECRET, TEST_DATABASE } = require('../config');
// const keys = require('../config/keys');
const { User } = require('../models/user');
const { UserData } = require('../models/user-data');

const should = chai.should();
chai.use(chaiHttp);

let secret = {
  CLIENT_ID,
  CLIENT_SECRET,
  DATABASE,
  TEST_DATABASE
};

// if (process.env.NODE_ENV !== 'production') {
//   secret = require('../config/keys');
// }

const testUser = {
  displayName: 'Evan Harris',
  googleId: '113991032114835833364',
  accessToken:
    'ya29.GlvVBK1WhImxQgRZGD9yanjRErwHcEmY6aQy2IFvzLli7WHPGW4Fv4iy2y1DwagsW9Qb8FEOJm_CfclLUAbRzocyina4RvRLrx5_92c-6A7A2_pXZZyg7ItY2e8Z',
  userData: this.userData
};

const seedFakeUser = user => {
  return User.create(user);
};

const tasksData = {
  userId: this.userId,
  userData: 'A bunch of stuff'
};

const seedTasks = tasksData => {
  // console.log('Executed tasks seeding');
  return UserData.create(tasksData);
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

    // Use Promise all if we need to seed more data
    // return Promise.all([seedUserData(), seedOtherData()]);

    return Promise.all([seedFakeUser(testUser), seedTasks(tasksData)]);

  });

  afterEach(() => {
    // console.log('What does our data look like: ', testUser);
    return tearDownDatabase();
  });


  // delete whatever seeded data we do not want to persist to the next test



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

  describe('GET requests', () => {
    
    it('should return all users', function() {
      let res;
      return chai.request(app)
        .get('/api/users')
        .then(_res => {
          res= _res;
          res.should.have.status(200);
        });
    });

    it.only('should return all tasks', function() {
      let resTasks;
      return chai.request(app)
        .get('/api/tasks')
        .then(res => {
          res.should.have.status(200);
          res.should.be.json;
          console.log('What is res: ', res.body);
        });
    });
  });

// describe('POST requests', () => {});

// describe('PUT requests', () => {});

});
// Most recent version is below:

// 'use strict';
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const mongoose = require('mongoose');

// const { app, runServer, closeServer } = require('../index');
// const { CLIENT_ID, CLIENT_SECRET, TEST_DATABASE } = require('../config');
// const { User } = require('../models/user');
// const { UserData } = require('../models/user-data');

// const should = chai.should();
// chai.use(chaiHttp);

// let secret = {
//   TEST_DATABASE: process.env.TEST_DATABASE,
//   CLIENT_ID: process.env.CLIENT_ID,
//   CLIENT_SECRET: process.env.CLIENT_SECRET
// };
// // console.log('Lets make sure we have everything we need from secret here:', secret);
// const testUser = {
//   displayName: 'Evan Harris',
//   googleId: '113991032114835833364',
//   accessToken:
//     'ya29.GlvVBK1WhImxQgRZGD9yanjRErwHcEmY6aQy2IFvzLli7WHPGW4Fv4iy2y1DwagsW9Qb8FEOJm_CfclLUAbRzocyina4RvRLrx5_92c-6A7A2_pXZZyg7ItY2e8Z',
//   userData: this.userData
// };

// const seedFakeUser = user => {
//   return User.create(user);
// };

// const tasksData = {
//   userId: this.userId,
//   userData: 'A bunch of stuff'
// };

// // const seedTasks = tasksData => {
// //   // console.log('Executed tasks seeding');
// //   return UserData.create(tasksData);
// // };

// // const tearDownDatabase = () => {
// //   return new Promise((resolve, reject) => {
// //     mongoose.connection
// //       .dropDatabase()
// //       .then(result => {
// //         return resolve(result);
// //       })
// //       .catch(err => {
// //         return reject(err);
// //       });
// //   });
// // };

// describe('Life coach', () => {
//   // Testing life cycle methods
//   // before(() => runServer(3001, secret.TEST_DATABASE));

//   // after(() => closeServer());

//   // beforeEach(() => {

//   //   // Use Promise all if we need to seed more data
//   //   // return Promise.all([seedUserData(), seedOtherData()]);

//   //   return Promise.all([seedFakeUser(testUser), seedTasks(tasksData)]);

//   // });

//   // afterEach(() => {
//   //   // console.log('What does our data look like: ', testUser);
//   //   return tearDownDatabase();
//   // });


//   // delete whatever seeded data we do not want to persist to the next test



//   // Example User Query: 
//   // User.findOne({ googleId: testUser.googleId }).then(_user => {
//   //   console.log('User: ', _user);
//   // });
//   describe('Google authentication', () => {

//     // it('should redirect to google authentication', () => {
//     //   chai.request(app)
//     //     .get('/api/auth/google').redirects(0)
//     //     .set('Authorization', `Bearer ${testUser.accessToken}`)
//     //     .end((err, res) => {
//     //     // Could maybe refactor this for loop in a fashiong similar to the logout test
//     //     // where we look for the prescense of the googleUrl terminating in the '?'
//     //       let googleUrl =''; 
//     //       let currentChar;
//     //       for (let i = 0; i < res.headers['location'].length; i++) {
//     //         currentChar = res.headers['location'][i];
//     //         if (currentChar !== '?') {
//     //           googleUrl += currentChar;
//     //         } else if (currentChar === '?') {
//     //           break;
//     //         }
//     //       }
//     //       res.should.have.status(302);
//     //       googleUrl.should.equal('https://accounts.google.com/o/oauth2/v2/auth');
//     //     });
//     // });

//     // it('should logout the user', () => {
//     //   chai.request(app)
//     //     .get('/api/auth/logout').redirects(0)
//     //     .end((err, res) => {
//     //       res.should.have.status(302);
//     //       res.headers['location'].should.be.equal('/');
//     //       res.headers['set-cookie'][0].should.contain('accessToken=;');
//     //     });
//     // });
//   });

//   describe('GET requests', () => {
    
//     // it('should return all users', function() {
//     //   let res;
//     //   return chai.request(app)
//     //     .get('/api/users')
//     //     .then(_res => {
//     //       res= _res;
//     //       res.should.have.status(200);
//     //     });
//     // });

//     // it('should return all tasks', function() {
//     //   let resTasks;
//     //   return chai.request(app)
//     //     .get('/api/userData')
//     //     .then(res => {
//     //       res.should.have.status(200);
//     //       res.should.be.json;
//     //       console.log('What is res: ', res.body);
//     //     });
//     // });
//   });
//   it('Should be true', function() {
//     true.should.be.true;
//   });
// // describe('POST requests', () => {});

// // describe('PUT requests', () => {});

// });