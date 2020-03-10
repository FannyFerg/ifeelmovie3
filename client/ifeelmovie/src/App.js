import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Homepage from './components/Homepage.js'
import {Switch, Route} from 'react-router-dom';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Authservice from './components/auth/authservices';

class App extends Component {
  constructor(props){
    super(props);
    this.service = new Authservice();
  }
  render(){
      return (
      <div className="App">
      
      <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/signup" component={Signup}/>
      <Route exact path="/login" component={Login}/>
      </Switch>
     </div>)
  
    }}

export default App;
