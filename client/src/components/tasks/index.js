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
    this.setState({
      taskNameInput: null,
      deadline: null,
      important: false,
      urgent: false, 
      value: 'neither'
    })
    let form = document.getElementById("form");
    return form.reset();
  }

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
      return <li>You have No Tasks Left!!!</li>;
    }
  }

  showTaskHeader() {
    if (this.props.tasks !== null) {
      return (
      <h1 className="task-header">My Tasks</h1>
      )
    }
  }

  render() {
    return (
      <div className="task-form">
        <form id="form" onSubmit={event => this.submitTask(event)}>
          <label className="label task-label" > Task 
            <input
              type="text"
              placeholder="Add a task!"
              onChange={event => this.onChangeTaskName(event)} required
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
            <select defaultValue="Choose" onChange={event => this.onChangeDropdown(event)}>
              <option value="choose"> -- </option>
              <option value="neither">Neither</option>
              <option value="urgent">Urgent </option>
              <option value="important">Important</option>
              <option value="both">Both</option>
            </select>
          </label>
          <br />
          <button type="submit">Submit Task</button>
        </form>
       
        <div className="task-list-div"> {this.showTaskHeader()}<ul>{this.mapTasksToList()}</ul></div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  currentUser: state.authReducer.currentUser,
  tasks: state.taskReducer.tasks
});
export default connect(mapStateToProps)(Tasks);