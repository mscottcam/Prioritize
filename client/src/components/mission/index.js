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
  
  componentWillReceiveProps() {
    // console.log('Stuff')
    // console.log('This.props in mission component', this.props)
  }
  componentWillMount() {
    // console.log('The props: ', this.props)
    // I am 
    // this.props.dispatch(actions.fetchMission({currentUser: this.props.currentUser}));
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
    console.log('Missoin props prior to postMission dispatch: ', this.props)
    this.props.dispatch(actions.postMission({
      currentUser: this.props.currentUser,
      newMission: this.state.newMissionInputValue
    }));
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
          <button onClick={() => this.toggleMissionChange()}>Change mission</button>
        </div>
      )
    };
  };
}


const mapStateToProps = (state, props) => ({
  currentUser: state.authReducer.currentUser,
  mission: state.missionReducer.currentMission
});
export default connect(mapStateToProps)(Mission);