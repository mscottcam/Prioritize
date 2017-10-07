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

  componentWillMount() {
    this.props.dispatch(actions.fetchUserData());
  };

  onChange(event) {
    this.setState({
      taskInputValue: event.target.value
    });
  };
  
  submitTask(event) {
    event.preventDefault();
    console.log('submitting task -->')
    this.props.dispatch(actions.postTask({
      userId: this.props.currentUser._id,
      userData: {
        task: this.state.taskInputValue
      }
    }))
    let form = document.getElementById("form");
    form.reset();
  };

  deleteTask(event) {
    console.log('delete button event -->', event.currentTarget)
  }

  mapTasksToList() {
    if (this.props.tasks !== null) {
      console.log('got here', this.props.tasks.userdata)
      // Commented this out to test heroku deployment, but we will have to modify this map function
      
      // return this.props.tasks.userData.map(taskObj => {
      //   return (
      //       <li>{taskObj._id}</li>
      //   )
      // });
    } else {
      return <li>no task</li>
    }
  };
   
  render() {
    // this.state.tasks.map(task => <li>{task}</li>)
              // {this.mapTasksToList()}
    console.log('HERE ARE THE INCOMING TASKS --> ', this.props.tasks)
    return (
      <div>
        <ul>
          {this.mapTasksToList()}
        </ul>
        <form id="form" onSubmit={event => this.submitTask(event)}>
          <input 
            type='text' 
            placeholder="Add a task!" 
            onChange={event => this.onChange(event)} 
          />
          <button type="submit">Submit Task</button>
        </form>
      </div>   
    )
  };
};

const mapStateToProps = (state, props) => ({
  currentUser: state.authReducer.currentUser,
  tasks: state.taskReducer.userData
});
export default connect(mapStateToProps)(Tasks);