import React from 'react';
import LogIn from '../LogIn'
// import UserInfo from '.userInfo';
// header should have the name of our App
// Header should have the userInfo component which has the username and logout buttons

export default class Header extends React.Component {
  render(){
  return (
     <div className="card">
					<h1>Prioritize</h1>
						<LogIn /> 
			</div>
		);
	};
}