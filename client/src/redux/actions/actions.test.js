"use strict";

let request = require("request");

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./actions";
import nock from "nock";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async actions", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("creates FETCH_TASKS_SUCCESS when fetching tasks has been done", () => {
    nock("http://localhost:8080")
      .get("/api/tasks")
      .reply(200, { tasks: ["study hard"] });
    const expectedActions = [
      { type: actions.FETCH_TASKS_REQUEST },
      // The below line: why does 'body: { tasks: ['study hard']}' fail?
      { type: actions.FETCH_TASKS_SUCCESS, tasks: { tasks: ["study hard"] } }
    ];
    const store = mockStore({ text: [] });
    return store.dispatch(actions.fetchTasks()).then(() => {
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
      .post("/api/tasks", postBody)
      .reply(201, {ok: true, id: 1234});
    const expectedActions = [
      { type: actions.POST_TASK_REQUEST },
      { type: actions.POST_TASK_SUCCESS, task: { ok: true, id: 1234 } }
    ];
    const store = mockStore({ tasks: [] });
    return store.dispatch(actions.postTask(postBody)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("creates FETCH_MISSION_SUCCESS when fetching missions has been done", () => {
    nock("http://localhost:8080")
      .get("/api/mission")
      .reply(200, { mission: ["lots of text"] });
    const expectedActions = [
      { type: actions.FETCH_MISSION_REQUEST },
      { type: actions.FETCH_MISSION_SUCCESS, mission: { mission: ["lots of text"] } }
    ];
    const store = mockStore({ text: [] });
    return store.dispatch(actions.fetchMission()).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates POST_MISSION_SUCCESS when making new mission', () => {
        const userMission = {
        userId: 1234,
        mission: 'lots of thoughts',
        role: "dev",
      }
    nock('http://localhost:8080')
      .post('/api/mission', userMission)
      .reply(201, {ok: true, id: 1234});
      const expectedActions = [
        {type: actions.POST_MISSION_REQUEST},
        {type: actions.POST_MISSION_SUCCESS, mission: { ok: true, id: 1234 }}
      ]
      const store = mockStore({text:[] });
      return store.dispatch(actions.postMission(userMission)).then(() => {
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
      .put('/api/tasks', taskToUpdate)
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
  
});