import React from 'react';

class Tasks extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: []
    }
  };
  
  // onChange(event) {
    // console.log('HERE IT IS', event.target.value)
 
  // }
  
  submitTask(event) {
    console.log(event.target.value)
    // this.setState({
    //   tasks: [...this.state, event.target.value]
    // })
  }
  
  
  
  
  render() {
    return (
      <div>
        
        <form onSubmit={event => this.submitTask(event)}>
          <input 
            type='text' 
            placeholder="Add a task!" 
            onChange={event => this.onChange(event)} 
          />
          <button type="submit">Submit Task</button>
        </form>
      </div>   
    )
  }
}

export default Tasks