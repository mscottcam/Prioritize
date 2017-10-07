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
    // return (
    //   <div className="App">
    //     <div className="App-header">
    //       <Header />
    //     </div>
    //     <p className="App-intro">
    //       Prioritize is an productivity app designed to make your life easier. 
    //       You enter your tasks and Prioritize will reorder your tasks to and help you make the most of your time. 
    //     </p>
    //     <a href={'/api/auth/google'}>Login with Google Friend</a>
    //     <Tasks />
    //   </div>
    // );
    console.log('Them Props tho: ', this.props);
    console.log("Current User is: ", this.props.currentUser);
    if (!this.props.currentUser) {
      return (
      <div>
        <p> User should login here </p>
        <a href={'/api/auth/google'}>Login with Google Friend</a>
      </div>
      )
    } else {
      return (
        <div>
          <p> {this.props.currentUser.displayName} is logged in now</p>
          <a href={'/api/auth/logout'}>LogOut</a>
          <Tasks />
        </div>
      )
    }
  };
};

const mapStateToProps = (state, props) => ({
  currentUser: state.authReducer.currentUser
});
export default connect(mapStateToProps)(App);


