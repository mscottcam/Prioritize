
let user = {
  roles: {
    husband: {
      goals: [
        {
          description: 'be good',
          tasks: []
        }
      ]
    }
  }
},
    father: {},
    developer: {}
}

let task = {
  taskName: {type: String, required: true},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  deadline: {type: new Date},
  important: {type: Boolean},
  urgent: {type: Boolean}
  // add role, goal, project?
}

const UserSchema = new Schema({
  displayName: { type: String },
  googleId: { type: String, required: true },
  accessToken: { type: String, required: true },
  mission: {type: String, required: true},
  roles: {
    roleName: {type: String, required: true},
    roleData: {
      mission: {type: String},
      goals: {
        goal: {type: String, required: true},
        goalData: {
          tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'user-data'}]
        }
      }
    }
  }
});