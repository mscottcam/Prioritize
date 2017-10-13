import React from "react";
import "./App.css";
import * as actions from "./redux/actions";
import { connect } from "react-redux";

import Header from "./components/header";
import Mission from "./components/mission";
import Tasks from "./components/tasks";

export class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(actions.authenticate());
  }

  showMissionAndTasks() {
    if (this.props.currentUser) {
      return (
        <div>
          <Mission />
          <Tasks />
        </div>
      );
    } else {
      return (
        <div>
          <p className="App-intro">
            Prioritize is a productivity app designed to make your life easier.
          </p>
          <p className="App-intro">
            You enter your tasks and Prioritize will reorder your tasks and help
            you make the most of your time.
          </p>
          <h2 className="welcome-message">Login to start prioritizing!</h2>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Header />
        </div>
        {this.showMissionAndTasks()}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  currentUser: state.authReducer.currentUser
});
export default connect(mapStateToProps)(App);
