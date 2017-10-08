import React from 'react';
import * as actions from '../../redux/actions';

import {connect} from 'react-redux';

export class Mission extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      changeMissionToggle: false,
      newMissionInputValue: ''
    }
  }
  
  componentWillMount() {
    this.props.dispatch(actions.fetchMission());
  };

  toggleMissionChange() {
    this.setState({
      changeMissionToggle: true
    })
  }

  changeMissionInput(input) {
    this.setState({
      newMissionInputValue: input.target.value
    });
  };

  submitMissionChange(event){
    event.preventDefault();
    // this.state.newMissionInputValue
    this.setState({
      changeMissionToggle: false
    });
  };

  render() {
    if(this.state.changeMissionToggle === true) {
      return (
        <div className="change-mission-form" >
          <p>Current Mission: {this.props.mission}</p>
          <form id="form" onSubmit={event => this.submitMissionChange(event)}>
            <input 
              type='text' 
              placeholder="New Mission Here" 
              onChange={event => this.changeMissionInput(event)} 
            />
            <button type="submit">Submit New Mission</button>
          </form>
        </div>
      )
    }
    if(this.state.changeMissionToggle === false) {
      return (
        <div>
          <p>{this.props.mission}</p>
          <button onClick={() => this.toggleMissionChange()} >Change mission</button>
        </div>
      )
    };
  };
}


const mapStateToProps = (state, props) => ({
  currentUser: state.authReducer.currentUser,
  mission: state.missionReducer.currentMission,
});
export default connect(mapStateToProps)(Mission);