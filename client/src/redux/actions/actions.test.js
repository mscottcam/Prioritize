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
      .reply(200, {body: { tasks: ['study hard']}});
  
  const expectedActions = [
    { type: actions.FETCH_TASKS_REQUEST },
    { type: actions.FETCH_TASKS_SUCCESS, body: { tasks: ['study hard']}}
  ]
  const store = mockStore({ tasks: [] })
  return store.dispatch(actions.fetchTasks())
    //return async actions
    expect(store.getActions()).toEqual(expectedActions)
  })
})