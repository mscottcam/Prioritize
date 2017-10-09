import React from 'react';
import * as actions from '../../redux/actions';

import {connect} from 'react-redux';

export class Tasks extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      taskInputValue: null
    };
  };

  componentDidUpdate() {
    this.props.dispatch(actions.fetchUserData({currentUserId: this.props.currentUser}))
  }

  onChange(event) {
    this.setState({
      taskInputValue: event.target.value
    });
  };
  
  submitTask(event) {
    event.preventDefault();
    console.log('submitting task -->')
    console.log('On submit, props are: ', this.props)
    this.props.dispatch(actions.postTask({
      userId: this.props.currentUser._id,
      taskName: this.state.taskInputValue,
      deadline: 'two-three weeks',
      important: true,
      urgent: false
    }))
    let form = document.getElementById("form");
    form.reset();
  };

  deleteTask(event) {
    console.log('delete button event -->', event.currentTarget)
  }

  mapTasksToList() {
    if (this.props.tasks !== null) {
      return this.props.tasks.map((taskObj, index) => {
        return (
            <li key={index}>{taskObj.taskName}</li>
        )
      });
    } else {
      return <li>no task</li>
    }
  };
   
  render() {
    return (
      <div>
        <form id="form" onSubmit={event => this.submitTask(event)}>
          <input 
            type='text' 
            placeholder="Add a task!" 
            onChange={event => this.onChange(event)} 
          />
          <button type="submit">Submit Task</button>
        </form>
        <ul>
          {this.mapTasksToList()}
        </ul>
      </div>   
    )
  };
};

const mapStateToProps = (state, props) => ({
  currentUser: state.authReducer.currentUser._id,
  tasks: state.taskReducer.tasks
});
export default connect(mapStateToProps)(Tasks);