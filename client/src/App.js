import React from 'react';
import './App.css';
import * as actions from './redux/actions'
import {connect} from 'react-redux';

import Header from './components/header';
import Tasks from './components/tasks';

export class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(actions.authenticate())
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Header />
        </div>
        <p className="App-intro">
          Prioritize is an productivity app designed to make your life easier. 
          You enter your tasks and Prioritize will reorder your tasks to and help you make the most of your time. 
        </p>
        <a href={'/api/auth/google'}>Login with Google Friend</a>
        <Tasks />
      </div>
    );
  };
};

const mapStateToProps = (state, props) => ({
  currentUser: state.authReducer.currentUser
});
export default connect(mapStateToProps)(App);


