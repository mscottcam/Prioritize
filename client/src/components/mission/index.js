import React from 'react';
import * as actions from '../../redux/actions';

import {connect} from 'react-redux';

export class Mission extends React.Component {
  
  componentWillMount() {
    this.props.dispatch(actions.fetchMission());
  };

  onClick(event){
    //allow user to be able to edit mission
  }

  render() {
    console.log('This is props====>',this.props)
    // console.log('Missions will be here once db is populated --->', this.props.mission)
    return (
      <div>
        <p> Mission will go here</p>
      </div>
    )
  };
}


const mapStateToProps = (state, props) => ({
  currentUser: state.authReducer.currentUser,
  mission: state.authReducer.currentUser.mission,
  // the above will pull mission once we have one in the db
  tasks: state.taskReducer.userData
});
export default connect(mapStateToProps)(Mission);