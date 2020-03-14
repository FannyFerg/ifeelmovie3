import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Authservices from './authservices';


export class Login extends React.Component {
constructor(props){
  
  super(props);
  this.state = {
  username:"", 
  password:"", 


}
this.service = new Authservices()
}
  

  handleSubmit = (event) => {
    event.preventDefault();
    //signup
    this.service.Login(this.state.username, this.state.password)
    .then(() => {
    
      //mise a jour avec les infos utilisateurs
      this.service.edit(this.state.username, this.state.password, )
          .then(response => {
            this.setState({
              username:"", 
              password:"", 
            
            })
            this.props.updateUser(response);
            this.props.history.push('/');
          })
          .catch(err => this.setState({error: err.response.data.message}))
        })
        .catch(err => this.setState({error: err.response.data.message}))
      ;
    }

    handleChange = (event) => {
      const {name, value} = event.target;
      this.setState({[name]: value});
    } 

  render(){
      return (
  <div className="Login">

<form onSubmit={this.handleSubmit}>
 

  <p>
    <label>
    <em>Username</em>
    <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
    </label>            
  </p>
 
  <p>
    <label>
    <em>Password</em>
    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
    </label>
  </p>

 


  <p>
    <button className="btn" onClick={this.handleSubmit}>Login</button>
  </p>
 

  </form>

    <p>
     <small>If you dont  have an account, you can sign up from <Link to="/signup">here</Link></small>
   </p>
  </div>
)
}}

export default Login;