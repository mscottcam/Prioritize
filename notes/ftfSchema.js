'use strict';
const userSchema = {
  id: 123,
  archive: [],
  roles: [
    {
      role: 'husband',
      goals:[],
      projects:[],
      tasks:[],
    },
  ]
  goals: [
    {
      goal: '',
      important: false,
      deadline: '',
      projects: [
        {
          project: '',
          deadline: '',
          important: false,
          urgency: 'function',
          tasks:[
            {
              task: '',
              deadline: '',
              important: false,
              urgency: (deadline) => {
                if ((currentTime - deadline)< 24) {
                  return 'super-urgent';
                } else if ((currentTime - deadline)< 48) {
                  return 'urgent';
                }
                return 'normal';
              },
              key: value, 
            }
          ] 
        }
      ]
    }]
}

userMissionInput = {
  userId: 123,
  mission: 'string of awesome ambition/hope/dreams'
}
user = {
  userId: 123, 
  tasks: [
    {
  role: 'husband',
  goal:'',
  project:'',
  task: 'make dinner',
  deadline: '',
  important: false,
  urgent: false
},
    {
  role: 'sportsman',
  goal:'',
  project:'',
  task: 'make dinner',
  deadline: '',
  important: false,
  urgent: false
  }
  ]
}

userTaskInput = {
  userId: 123,
  role: 'husband',
  goal:'',
  project:'',
  task: 'make dinner',
  deadline: '',
  important: false,
  urgent: false
}