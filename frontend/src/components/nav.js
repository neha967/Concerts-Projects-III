import React, { Component } from "react";
import axios from "../utils/axiosInstance"
import { withRouter } from "react-router-dom";

class Nav extends Component {

    logoutHandler = () => {
        axios.get(`${process.env.REACT_APP_API}/auth/logout`)
        .then(()=>{
            localStorage.removeItem("user")
            this.props.history.push("/auth/login")
        })
    }
    
    render(){
        return(
            <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-center" id="collapsibleNavbar">
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
            </div>
            </nav>
        )
    }
}

export default withRouter(Nav);
