'use strict';

const chai = require('chai');
const expect = chai.expect;

const {quadrantDecider} = require('../lib/quadrant-decider');

describe('quadrant decider', () => {
  it('should return quadrant 1 if urgent and important are true', () => {
    const task = {
      userId: '59d64ed9c996510584f2fc32',
      taskName: 'graduate from Thinkful',
      deadline: '2017/11/29',
      important: true,
      urgent: true
    };
    expect(quadrantDecider(task)).to.equal(1);
  });

  it('should return quadrant 2 if important is true, urgent is false', () => {
    const task = {
      userId: '59d64ed9c996510584f2fc32',
      taskName: 'graduate from Thinkful',
      deadline: '2017/11/29',
      important: true,
      urgent: false
    };
    expect(quadrantDecider(task)).to.equal(2);
  });

  it('should return quadrant 3 if important is false, urgent is true', () => {
    const task = {
      userId: '59d64ed9c996510584f2fc32',
      taskName: 'graduate from Thinkful',
      deadline: '2017/11/29',
      important: false,
      urgent: true
    };
    expect(quadrantDecider(task)).to.equal(3);
  });

  it('should return 4 if both are false', () => {
    const task = {
      userId: '59d64ed9c996510584f2fc32',
      taskName: 'graduate from Thinkful',
      deadline: '2017/11/29',
      important: false,
      urgent: false
    };
    expect(quadrantDecider(task)).to.equal(4);
  });
});