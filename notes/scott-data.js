
let user = {
  roles: {
    husband: {
      goals: {
        'be good': {
          projects: {
            'project1': {
              tasks: 'userData ref'
            }
          }
        }
      }
    },
    father: {},
    developer: {}
  } 
}

let task = {
  taskName: {type: String, required: true},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  deadline: {type: new Date},
  important: {type: Boolean},
  urgent: {type: Boolean}
  // add role, goal, project?
}