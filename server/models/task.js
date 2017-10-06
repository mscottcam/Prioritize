'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { User } = require('./user');

const TaskSchema = new Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  taskName: {type: String, required: true},
  deadline: {type: String},
  important: {type: Boolean},
  urgent: {type: Boolean}
});

TaskSchema.methods.apiRepr = function() {
  return {
    _id: this._id,
    taskName: this.taskName,
    userId: this.userId || 'No user id',
    deadline: this.deadline,
    important: this.important,
    urgent: this.urgent
  };
};

const Task = mongoose.model('task', TaskSchema);

module.exports = { Task };

// JSON for Postman Testing:
// {
//   "taskName": "Do work!",
//   "userId": "59cf0143b637d01e78cabd15"
// }