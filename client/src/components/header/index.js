import React from 'react';
import './header.css';

import UserInfo from '../userInfo'

export default class Header extends React.Component {
  render(){
  return (
    <nav className="nav">
      <h1 id="header"className="prioritize-name">Prioritize</h1>
      <UserInfo/>
    </nav>
		);
	};
};
