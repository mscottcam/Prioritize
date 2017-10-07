'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { UserData } = require('./user-data');

// User Schema.userData: references the _id for userDataSchema
const UserSchema = new Schema({
  displayName: { type: String },
  googleId: { type: String, required: true },
  accessToken: { type: String, required: true },
  userData: {type: mongoose.Schema.Types.ObjectId, ref: 'user-data' }
});

UserSchema.methods.apiRepr = function() {
  return {
    _id: this._id,
    displayName: this.displayName,
    googleId: this.googleId,
    userData: this.userData || 'No tasks yet'
  };
};

const User = mongoose.model('user', UserSchema);

module.exports = { User };