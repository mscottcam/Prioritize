import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, props) => ({
    name: state.name,
})

export function LogIn() {
  if (state.loggedIn) {
    return (
      <button className="login"><a href={'/api/auth/google'}>Login with Google</a> </button>
    ) 
  }
  return  (
		<div>
			<h2 className="userInfo">user name here{this.props.name}</h2>
      <button className="logout"> <a href={'/api/auth/logout'}>LogOut</a> </button>
		</div>
	);
}

export default connect(mapStateToProps)(LogIn);