'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { User } = require('./user');

// User Data Schema.user: references the _id for userSchema
const UserDataSchema = new Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  userData: [Schema.Types.Mixed]
});

UserDataSchema.methods.apiRepr = function() {
  return {
    _id: this._id,
    userId: this.userId || 'No user id',
    userData: this.userData
  };
};

const UserData = mongoose.model('user-data', UserDataSchema);

module.exports = { UserData };

// JSON for Postman Testing:
// {
//   "userId": "59cf0143b637d01e78cabd15",
//   "userData": [
//     {
//       "task": "Troubleshoot",
//       "multiple": "Additional key value pairs in this object are reflected in the res.json, 
//        but the object containing goal is not."
//     },
//     {
//       "goal": "Troubleshoot"
//     }
//   ]
// }