'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { Task } = require('./task');

// Reintroduce role, goal as being required after completing initial  setup
// this will populate the initial UI with dummy data

const UserSchema = new Schema({
  displayName: { type: String },
  googleId: { type: String, required: true },
  accessToken: { type: String, required: true },
  mission: {type: String},
  roles: [
    {
      role: {type: String},
      goals: [
        {
          goal: {type: String},
          tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'task'}]
        }
      ]
    }
  ]
});

UserSchema.methods.apiRepr = function() {
  return {
    _id: this._id,
    displayName: this.displayName,
    googleId: this.googleId,
    roles: this.roles
  };
};

const User = mongoose.model('user', UserSchema);

module.exports = { User };