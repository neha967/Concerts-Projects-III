import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Nav extends Component {

    logoutHandler = () => {
        debugger
        axios.get(`${process.env.REACT_APP_API}/auth/logout`)
        .then(()=>{
            localStorage.removeItem("user")
            this.props.history.push("/auth/login")
        })
    }
    
    render(){
        return(
            <nav className="navbar navbar-expand-lg bg-primary navbar-dark justify-content-center">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <a className="nav-link display-4 font-weight-bold" href="/home">Home |</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link display-4 font-weight-bold" href="/favorites">Favorites |</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link display-4 font-weight-bold" href="/connect">Connect |</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link display-4 font-weight-bold" href="/" onClick={this.logoutHandler}>Logout</a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default withRouter(Nav);