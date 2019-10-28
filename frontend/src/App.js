import React, { Component } from 'react';
import './App.css';
import { Route, Redirect } from "react-router-dom";
import Home from "./components/home";
import Event from "./components/events";
import Detail from "./components/detail";
import Signup from "./components/signup";
import Login from "./components/login";
import Base from "./components/index";
import Nav from "./components/nav";
import {withRouter} from "react-router-dom";
import Favorite from "./components/favorites";
import Connect from "./components/connect";

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => (
  
  <Route {...rest} render={(props) => (
        loggedIn ? (
            <Component {...props} {...rest}/>
        ) : (
          <Redirect to="/auth/login"/>
        )
  )}/>
)

class App extends Component {

  constructor(props){
    super(props);
    this.state= {
      loggedIn: !!localStorage.getItem("user")
    }
  }

  checkForUserStatus = () => {
    if(localStorage.getItem("user")){
      this.setState({
        loggedIn: true
      })
    } else {
      this.setState({
        loggedIn: false
      })
    }
  }

  navDisplay = () => {
    if(this.props.location.pathname === "/" || this.props.location.pathname === "/home" || this.props.location.pathname === "/auth/signup" || this.props.location.pathname === "/auth/login"){
      return true
    }
  }

  render(){

    return (
      <>
      {this.navDisplay() ? null : <Nav/>}
        <Route path="/" exact component={Base}/>
        <PrivateRoute path="/home" exact component={Home} loggedIn={this.state.loggedIn}/>
        <PrivateRoute path="/events/:id" exact component={Event} loggedIn={this.state.loggedIn}/>
        <PrivateRoute path="/event-details/:id" exact component={Detail} loggedIn={this.state.loggedIn}/>
        <PrivateRoute path="/favorites" exact component={Favorite} loggedIn={this.state.loggedIn}/>
        <PrivateRoute path="/connect" exact component={Connect} loggedIn={this.state.loggedIn}/>
        <Route path="/auth/signup" exact render={(routeProps)=> <Signup {...routeProps} user={this.checkForUserStatus}/>}/>
        <Route path="/auth/login" exact render={(routeProps)=> <Login {...routeProps} user={this.checkForUserStatus}/>}/>
      </>
    );
  }
}

export default withRouter(App);
