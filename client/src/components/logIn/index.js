import React from 'react';
import { connect } from 'react-redux';

// const mapStateToProps = (state, props) => ({
//     name: state.name,
// })

export class LogIn extends React.Component {
  // constructor (props) {
  //   super (props)
  // }
  render(){
    if (this.props.currentUser === null) {
      return (
        <button className="login"><a href={'/api/auth/google'}>Login with Google</a> </button>
      ) 
    }
    return  (
      <div>
        <h2 className="userInfo">{this.props.userId}</h2>
        <button className="logout"> <a href={'/api/auth/logout'}>LogOut</a> </button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  console.log(state)
  return {
    currentUser: state.taskReducer.currrentUser,
    userId: state.taskReducer.userId
  // cheeses: state.CheesesReducer.cheeses
}};


export default connect(mapStateToProps)(LogIn);