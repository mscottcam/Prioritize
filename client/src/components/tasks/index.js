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
      actions.fetchUserData({currentUserId: this.props.currentUser})
    )
  }

  onChangeTaskName(event) {
    event.preventDefault();
    this.setState({
      taskNameInput: event.target.value
    });
  };

  onChangeDeadline(event) {
    this.setState({
      deadline: event.target.value
    });
  };

  onChangeDropdown(event) {
    if (event.target.value === 'important') {
      this.setState({
        important: true
      });
    };
    if (event.target.value === 'urgent') {
      this.setState({
        urgent: true
      });
    };
    if (event.target.value === 'both') {
      this.setState({
        important: true,
        urgent: true
      });
    };
    if (event.target.value === 'neither') {
      this.setState({
        important: false,
        urgent: false
      })
    }
  };



  submitTask(event) {
    event.preventDefault();
    this.props.dispatch(
      actions.postTask({
        userId: this.props.currentUser,
        taskName: this.state.taskNameInput,
        deadline: this.state.deadline,
        important: this.state.important,
        urgent: this.state.urgent,
        value: this.state.value
      })
    );
    let form = document.getElementById("form");
    return form.reset();
  }

  deleteTask(task) {
    this.props.dispatch(actions.deleteTask(task._id)).then(() => {
      this.props.dispatch(
        actions.fetchUserData({ currentUserId: this.props.currentUser })
      );
    });
  }

  mapTasksToList() {
    if (this.props.tasks !== null) {
      const taskSort = this.props.tasks.sort((taskA, taskB) => {
        return taskA.quadrantValue - taskB.quadrantValue;
      });

      return taskSort.map((taskObj, index) => {
        return (
          <li className="current-tasks" key={index}>
            <div>
            <span className="task">{taskObj.taskName}</span>
            <span className="task-note">   --    {taskObj.deadline}</span>
            </div>
            <button className="delete-task"onClick={() => this.deleteTask(taskObj)}>Delete</button>
          </li>
        );
      });
    } else {
      return <li>You have No Tasks Left!!! You're all Up to Date</li>;
    }
  }
  

  render() {
    //<button onClick={() => this.userDataFetch()}>Testing</button>
    return (
      <div className="task-form">
        <form id="form" onSubmit={event => this.submitTask(event)}>
          <label className="label" > Task :
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
          <label className="label" >
            Urgent or Important?
            <select onChange={event => this.onChangeDropdown(event)} >
              <option selected value="none">Neither</option>
              <option value="urgent">Urgent</option>
              <option value="important">Important</option>
              <option value="both">Both</option>
            </select>
          </label><br />
          <button type="submit">Submit Task</button>
        </form>
        
        
        <div><ul>{this.mapTasksToList()}</ul></div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  currentUser: state.authReducer.currentUser._id,
  tasks: state.taskReducer.tasks
});
export default connect(mapStateToProps)(Tasks);