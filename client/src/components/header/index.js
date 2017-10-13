import React from 'react';
import './header.css';
// import "materialize-css/dist/css/materialize.min.css";

import UserInfo from '../userInfo'
// header should have the name of our App
// Header should have the userInfo component which has the username and logout buttons

export default class Header extends React.Component {
  render(){
  return (
     <nav className="nav">
					<h1 id="header"className="prioritize-name">Prioritize</h1>
					<UserInfo/>
			</nav> 
		);
	};
}