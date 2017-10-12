import React from "react";
import * as actions from "../../redux/actions";

import { connect } from "react-redux";

export class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskNameInput: null,
      deadline: null,
      important: false,
      urgent: false
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
        value: 'neither'
      })
    );
    let form = document.getElementById("form");
    form.reset();
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
          <li key={index}>
            <span>{taskObj.taskName}</span>
            <span>  -     {taskObj.deadline}</span>
            <button onClick={() => this.deleteTask(taskObj)}>Delete</button>
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
      <div>
        <form id="form" onSubmit={event => this.submitTask(event)}>
          <label> Name of task:
            <input
              type="text"
              placeholder="Add a task!"
              onChange={event => this.onChangeTaskName(event)} 
            />
          </label> <br />
          <label> Does it have a Deadline?
            <input
              type="text"
              placeholder="Add a Deadline"
              onChange={event => this.onChangeDeadline(event)} 
            />
          </label> <br />
          <label>
            Is this task Urgent or Important?
            <select value={this.state.value} onChange={event => this.onChangeDropdown(event)} >
              <option value="none">Neither</option>
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