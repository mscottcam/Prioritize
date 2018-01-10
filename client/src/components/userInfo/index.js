import React from "react";
import * as actions from '../../redux/actions'
import { connect } from "react-redux";
import "./userInfo.css";

export class UserInfo extends React.Component {

  demoLogin() {
    const demoUser = {
      _id: '59dec6719333b52e7027c22e',
      displayName: 'Demo User',
      googleId: '107591686684636909349',
      accessToken: 'ya29.GlviBKS1htgw_YE-Kv665WtHQun40FFSLJxAWHHa-JbNILnD5xNzmjT58RTzCweChbRSAWdZk2dhFQSElODnrsMPNQP3mkudc8MroFFKFHY_Ep6OdgxSFbjFscWM'
    };
    this.props.dispatch(actions.authSuccess(demoUser));
  }

  renderListItems() {
    if (!this.props.currentUser) {
      return (
        <div>
          <li className="user-info">
            <a href={"/api/auth/google"}>Login with Google</a>
          </li>
          <li className="user-info">
            <button className="demo-login" onClick={() => this.demoLogin()}>Demo</button>
          </li>
        </div>
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
