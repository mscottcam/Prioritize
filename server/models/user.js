'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  displayName: { type: String },
  googleId: { type: String, required: true },
  accessToken: { type: String, required: true }
});

userSchema.methods.apiRepr = function() {
  return {
    _id: this._id,
    googleId: this.googleId
  };
};

const User = mongoose.model('user', userSchema);

module.exports = { User };