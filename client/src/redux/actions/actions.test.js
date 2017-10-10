"use strict";

let request = require("request");

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "../actions";
import nock from "nock";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async actions", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("creates FETCH_USER_DATA_SUCCESS when fetching tasks has been done", () => {
    nock("http://localhost:8080")
      .get("/api/userData/1234567890")
      .reply(200, { tasks: ["study hard"] });
    const expectedActions = [
      { type: actions.FETCH_USER_DATA_REQUEST },
      { type: actions.FETCH_USER_DATA_SUCCESS, userData: { tasks: ["study hard"] } }
    ];
    const store = mockStore({ text: [] });
    return store.dispatch(actions.fetchUserData({currentUserId: '1234567890'})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("creates POST_TASK_SUCCESS when posting new task", () => {
    const postBody = {
        userId: 1234,
        role: "dev",
        goal: "get a job",
        project: "testing research",
        task: "learn nock post",
        deadline: "",
        important: true,
        urgent: false
      }
    nock("http://localhost:8080")
      .post("/api/userTask", postBody)
      .reply(201, {ok: true, id: 1234});
    const expectedActions = [
      { type: actions.POST_TASK_REQUEST },
      { type: actions.POST_TASK_SUCCESS, taskData: { ok: true, id: 1234 } }
    ];
    const store = mockStore({ tasks: [] });
    return store.dispatch(actions.postTask(postBody)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("creates FETCH_MISSION_SUCCESS when fetching missions has been done", () => {
    nock("http://localhost:8080")
      .get("/api/mission/1234567890")
      .reply(200, { mission: ["create a working application"] });
    const expectedActions = [
      { type: actions.FETCH_MISSION_REQUEST },
      { type: actions.FETCH_MISSION_SUCCESS,  mission: ["create a working application"] } 
    ];
    const store = mockStore({ text: [] });
    return store.dispatch(actions.fetchMission({currentUserId: '1234567890'})).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates POST_MISSION_SUCCESS when making new mission', () => {
        const missionToUpdate = {
        userId: 1234,
        mission: 'create a working application',
        role: "dev",
      }
    nock('http://localhost:8080')
      .put('/api/userMission', missionToUpdate)
      .reply(201, {ok: true, id: 1234, userId: 1234, mission: 'work hard'});
      const expectedActions = [
        {type: actions.POST_MISSION_REQUEST},
        {type: actions.POST_MISSION_SUCCESS, mission: 'work hard' }
      ]
      const store = mockStore({});
      return store.dispatch(actions.postMission(missionToUpdate)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  })

  it('calls UPDATE_TASK_SUCCESS when updating a task', () => {
    const taskToUpdate = {
      taskId: 1234, 
      userId: 1234,
      role: "dev",
      goal: "get a job",
      project: "testing research",
      task: "learn nock post",
      deadline: "",
      important: true,
      urgent: false
    }
    nock('http://localhost:8080')
      .put('/api/userTask', taskToUpdate)
      .reply(201, {ok: true, id: 1234, taskId: 1234});
    const expectedActions = [
      {type: actions.UPDATE_TASK_REQUEST},
      {type: actions.UPDATE_TASK_SUCCESS, task: {ok: true, id: 1234, taskId: 1234}}
    ]
    const store = mockStore({});
    return store.dispatch(actions.updateTask(taskToUpdate)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })  
  
  it.only('calls DELETE_TASK_SUCCESS when a task is deleted', () => {
    nock('http://localhost:8080')
      .delete('/api/userTask/1234')
      .reply(204)
      const expectedActions = [
        { type: actions.DELETE_TASK_REQUEST },
        { type: actions.DELETE_TASK_SUCCESS }
      ];
      const store = mockStore({});
      return store.dispatch(actions.deleteTask('1234')).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  // it('authenticates user when Authenticate is called', () =>{
  //   nock('http://localhost:8080')
  //     .get('/api/me',
  //     // {currentUser: 'Lewi Gilamichael'} 
  //     )
  //   const expectedActions = [
  //     { type: actions.AUTH_SUCCESS, currentUser: { currentUser: 'Lewi Gilamichael'} },
  //     // { type: actions.FETCH_MISSION_SUCCESS, mission: { mission: ["lots of text"] } }
  //   ];
  //   const store = mockStore ({});
  //   return store.dispatch(actions.authenticate()).then(() => {
  //     expect(store.getActions()).toEqual(expectedActions);
  //   })
  // })
  
});