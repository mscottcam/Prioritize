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
   
  render() {
    return (
      <div>
        <ul>
          {this.state.tasks.map(task => <li>{task}</li>)}
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