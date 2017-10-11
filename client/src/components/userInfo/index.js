import React from "react";
// import * as actions from '../../redux/actions'
import { connect } from "react-redux";
import "./userInfo.css";

// should have the userName and a logOut button
export class UserInfo extends React.Component {
  componentDidMount() {
    // this.props.dispatch(actions.authenticate())
  }

        // </div>
  renderListItems() {
    if (!this.props.currentUser) {
      return (
        <li className="user-info">
          <a href={"/api/auth/google"}>Login with Google</a>
        </li>
      );
    } else {
      return (
          <div>
          <li className="user-info">
            {this.props.currentUser.displayName}
          </li>
          <li className="user-info">
            <a href={"/api/auth/logout"}>LogOut</a>
          </li>
          </div>
      );
    }
  }

  render() {
    return (
    <ul className="right">{this.renderListItems()}</ul>
    )
  }
}

const mapStateToProps = (state, props) => ({
  currentUser: state.authReducer.currentUser
});
export default connect(mapStateToProps)(UserInfo);
