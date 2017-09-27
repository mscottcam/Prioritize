'use strict';

let request = require('request');


import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './actions'
import nock from 'nock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  // afterEach(() => {
  //   nock.cleanAll()
  // })

  it('creates FETCH_TASKS_SUCCESS when fetching tasks has been done', () => {
    nock('http://www.example.com')
      .get('/tasks')
      .reply(200, {body: { tasks: ['study hard']}});

  
  const expectedActions = [
    { type: actions.FETCH_TASKS_REQUEST },
    { type: actions.FETCH_TASKS_SUCCESS, body: { tasks: ['study hard']}}
  ]
  const store = mockStore({ tasks: [] })
  return store.dispatch(actions.fetchTasks()).then(() => {
    //return async actions
    console.log('store ------>', store)
    expect(store.getActions()).toEqual(expectedActions)
  })
  })
})
// .reply(200, { body: { tasks: ['study hard'] } });

//    expect(store.getActions()).toEqual(expectedActions)



    // 24 var options = {
    //   url: 'http://www.example.com/tasks',
    //   method: 'GET',
    // };

    // request(options, function(err, response, body) {
    //   expect(body).toEqual("true");
    //   // done();
    // });
    // console.log(result);