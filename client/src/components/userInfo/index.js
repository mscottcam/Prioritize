import React from 'react';
// import * as actions from '../../redux/actions'
import {connect} from 'react-redux';

// should have the userName and a logOut button
export class UserInfo extends React.Component {
  componentDidMount() {
    // this.props.dispatch(actions.authenticate())
  };

  render() {
if (!this.props.currentUser) {
      return (
      <div>
        <p> User should login here </p>
        <a href={'/api/auth/google'}>Login with Google Friend</a>
      </div>
      )
    } else {
      return (
        <div>
          <p> {this.props.currentUser.displayName} is logged in now</p>
          <a href={'/api/auth/logout'}>LogOut</a>
          
        </div>
      )
    }
  }
}

const mapStateToProps = (state, props) => ({
  currentUser: state.authReducer.currentUser
});
export default connect(mapStateToProps)(UserInfo);