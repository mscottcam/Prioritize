import React from "react";
import * as actions from "../../redux/actions";

import { connect } from "react-redux";

import './tasks.css'

export class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskNameInput: null,
      deadline: null,
      important: false,
      urgent: false, 
      value: 'neither'
    };
  }

  componentWillMount() {
    this.props.dispatch(
      actions.fetchUserData({
        currentUserId: this.props.currentUser._id,
        token: this.props.currentUser.accessToken
      })
    );
  }

  onChangeTaskName(event) {
    // event.preventDefault();
    this.setState({
      taskNameInput: event.target.value
    });
  }

  onChangeDeadline(event) {
    this.setState({
      deadline: event.target.value
    });
  }

  onChangeDropdown(event) {
    if (event.target.value === "important") {
      this.setState({
        value: 'important',
        important: true,
        urgent: false
      });
    }
    if (event.target.value === "urgent") {
      this.setState({
        value: 'urgent',
        urgent: true,
        important: false
      });
    }
    if (event.target.value === "both") {
      this.setState({
        value: 'both',
        important: true,
        urgent: true
      });
    }
    if (event.target.value === "neither") {
      this.setState({
        important: false,
        urgent: false
      });
    }
  }

  // Update user ID being sent over
  submitTask(event) {
    event.preventDefault();
    this.props.dispatch(
      actions.postTask({
        userId: this.props.currentUser,
        taskName: this.state.taskNameInput,
        deadline: this.state.deadline,
        important: this.state.important,
        urgent: this.state.urgent
      })
    );
    let form = document.getElementById("form");
    return form.reset();
  }

  // Update user ID being sent over
  deleteTask(task) {
    this.props.dispatch(actions.deleteTask(task._id, this.props.currentUser.accessToken)).then(() => {
    this.props.dispatch(
      actions.fetchUserData({
        currentUserId: this.props.currentUser._id,
        token: this.props.currentUser.accessToken
      })
    );
    });
  }

  mapTasksToList() {
    if (this.props.tasks !== null) {
      console.log('this is being called');
      // const taskSort = this.props.tasks.sort((taskA, taskB) => {
      //   return taskA.quadrantValue - taskB.quadrantValue;
      // });

      return this.props.tasks.map((taskObj, index) => {
        return (
          <li className="current-tasks" key={index}>
              <div className="task-text">
                <span className="task">{taskObj.taskName}    --    {taskObj.deadline}</span>
              </div>
              <button className="delete-task" onClick={() => this.deleteTask(taskObj)}>Delete</button>
          </li>
        );
      });
    } else {
      return <li>You have No Tasks Left!!! You're all Up to Date</li>;
    }
  }
  showTaskHeader() {
    
  }
  render() {
    return (
      <div className="task-form">
        <form id="form" onSubmit={event => this.submitTask(event)}>
          <label className="label task-label" > Task 
            <input
              type="text"
              placeholder="Add a task!"
              onChange={event => this.onChangeTaskName(event)}
            />
          </label> <br />
          <label className="label" > Note
            <input
              type="text"
              placeholder="Deadline"
              onChange={event => this.onChangeDeadline(event)} 
            />
          </label> <br />
          <label className="label dropdown" >
            Urgent or Important?
            <select onChange={event => this.onChangeDropdown(event)}>
              <option selected > -- </option>
              <option value="neither">Neither</option>
              <option value="urgent">Urgent </option>
              <option value="important">Important</option>
              <option value="both">Both</option>
            </select>
          </label>
          <br />
          <button type="submit">Submit Task</button>
        </form>
        {this.showTaskHeader()}
        <div className="task-list-div"><ul>{this.mapTasksToList()}</ul></div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  currentUser: state.authReducer.currentUser,
  tasks: state.taskReducer.tasks
});
export default connect(mapStateToProps)(Tasks);