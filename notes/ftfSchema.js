'use strict';
//user log in with username, pw, and userId
// get request brings back data with userId matching and everything else
// ON log in = pull all data once
// onChange = change singular piece in the state and to server
// on logOut => clear cache?, 
// is flow being blocked by process? How do we make this flow better?
// economies of flow vs economies of scale

// api.get('/api/:userId/goals/:goalId/')
const state = {
  UserName: 'lewi',
  userId: 1234,
  currentMission: 'Have a useful and usable First Things First app that I will use myself',
  roles: [],
  goals: [
    {
      projectName: 'Be the Best Everything',
      projectId: 5678,
      tasks: []
    },
    {
      projectName: 'Learn Design',
      projectId: 5678,
      tasks: []
    }
  ],
  projects: [
    {
      projectId: 67890,
      tasks: []
    }
  ],
  tasks: [
    {
      taskId: 345,
      task: 'clean my room',
      deadline: ''
    }
  ]
}

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
          project: 'throw birthday party',
          deadline: '',
          important: false,
          urgency: 'function',
          tasks:[
            {
              task: '',
              deadline: '', // can be arbitrary 'first frost', first sunny day etc...  
              //we have to set some kind of metadata that allows us to be perfect in our understanding
              important: false,
              urgent: false,
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
    }],
  tasks: {
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
}

userMissionInput = {
  userId: 123,
  mission: 'string of awesome ambition/hope/dreams'
}
user = {
  userId: 123,
  // archive: [],
  mission: [], 
  tasks: [
    {
    role: 'husband',
    goal:'',
    project:'throw my birthday party',
    projectId: '',
    task: 'make dinner',
    deadline: '',
    important: false,
    urgent: false
  },
     {
    role: 'husband',
    goal:'',
    project:'throw my birthday party',
    projectId: '',
    task: 'invite friends',
    deadline: '',
    important: false,
    urgent: false
  },
     {
    role: 'husband',
    goal:'',
    project:'throw my birthday party',
    projectId: '',
    task: 'clean dishes',
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