import React from 'react';

class Tasks extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: [], 
      taskInputValue: null
    };
  };

  componentDidMount() {
    console.log('on mount tasks -->', this.state.tasks)
  }

  onChange(event) {
    console.log(event.target.value)
    this.setState({
      taskInputValue: event.target.value
    });
  };
  
  submitTask(event) {
    console.log('at submit input val -->', this.state.taskInputValue)
    event.preventDefault();
    this.setState({
      tasks: [...this.state.tasks, this.state.taskInputValue]
    });
    let form = document.getElementById("form");
    form.reset();
  };
  
  mapTasks() {
    if (this.state.tasks.length === 0) {
      <p>No current tasks</p>
    } else {
      this.state.tasks.map(task => {
        <li>{task}</li>
      });
    }
  }
      
  
  mapTasks() {
    this.state.tasks.map(task => {
      <li>{task}</li>
    });
  };
  
  
  render() {
    return (
      <div>
        <ul>
<<<<<<< HEAD
          {this.mapTasks()}
        </ul>
        <form onSubmit={event => this.submitTask(event)}>
=======
          {
            this.state.tasks.map(task => {
              return <li>{task}</li>
            })
          }
        </ul>
        <form id="form" onSubmit={event => this.submitTask(event)}>
>>>>>>> c35d72ea0a9c7465172f1e71ae29d58b1ff84eb5
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