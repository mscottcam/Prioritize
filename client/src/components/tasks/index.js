import React from 'react';

class Tasks extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: [], 
      taskInputValue: null,

    };
  };

  componentDidMount() {
  }

  onChange(event) {
    this.setState({
      taskInputValue: event.target.value
    });
  };
  
  submitTask(event) {
    event.preventDefault();
    this.setState({
      tasks: [...this.state.tasks, this.state.taskInputValue]
    });
    let form = document.getElementById("form");
    form.reset();
  };

  deleteTask(event) {
    console.log('delete button event -->', event.currentTarget)
  }

  mapTasksToList() {
    return this.state.tasks.map(task => {
      return (
        <div  className="task">
          <li onClick={event => this.deleteTask(event)} >
            {task}
            <button type="button">Delete Task</button>
          </li>
          
        </div>
      )
    });
  };
   
  render() {
    // this.state.tasks.map(task => <li>{task}</li>)
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

export default Tasks;