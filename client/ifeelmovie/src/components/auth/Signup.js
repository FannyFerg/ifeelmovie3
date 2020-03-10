
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Authservices from './authservices';


export class Signup extends React.Component {
constructor(props){
  
  super(props);
  this.state = {
  username:"", 
  password:"", 
  email:"",

}
this.service = new Authservices()
}
  

  handleSubmit = (event) => {
    event.preventDefault();
    //signup
    this.service.signup(this.state.username, this.state.password)
    .then(() => {
    
      //mise a jour avec les infos utilisateurs
      this.service.edit(this.state.username, this.state.password, this.state.email)
          .then(response => {
            this.setState({
              username:"", 
              password:"", 
              email:"",
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
  <div className="Signup">

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
    <label>
    <em>email</em>
    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
    </label>
  </p>


  <p>
    <button className="btn" onClick={this.handleSubmit}>Create the account</button>
  </p>
 
  {/* <p className="account-message">
     You have an account? <link href="/login">Sign in</link>
  </p> */}
  </form>

    <p>
     <small>If you already have an account, you can login from <Link to="/login">here</Link></small>
   </p>
  </div>
)
}}

export default Signup ;