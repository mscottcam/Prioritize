'use strict';

let request = require('request');


import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './actions'
import nock from 'nock';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates FETCH_TASKS_SUCCESS when fetching tasks has been done', () => {
    nock('http://localhost:8080')
      .get('/api/tasks')
      .reply(200, { tasks: ['study hard']});
  
    const expectedActions = [
      { type: actions.FETCH_TASKS_REQUEST },
      // The below line: why does 'body: { tasks: ['study hard']}' fail? 
      { type: actions.FETCH_TASKS_SUCCESS, tasks: { tasks: ['study hard']}}
    ]
    const store = mockStore({ text: [] })
    return store.dispatch(actions.fetchTasks())
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it.only('creates POST_TASK_SUCCESS when posting new task', () => {
    nock('http://localhost:8080')
      .post('/api/tasks', {
        userId: 1234,
        role: 'dev',
        goal: 'get a job',
        project: 'testing research', 
        task: 'learn nock post',
        deadline: '',
        important: true,
        urgent: false
      })
      .reply(201, {
        ok: true,
        id: 1234
        // rev: 
      })
    const expectedActions = [
      { type: actions.POST_TASK_REQUEST },
      { type: actions.POST_TASK_SUCCESS, body: { ok: true, id: 1234 }}
    ]
    const store = mockStore({tasks: [] })
    return store.dispatch(actions.postTask())
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

})