import React, { Component } from "react";
import { Link } from "react-router-dom";

class Base extends Component {
    render(){
        return(
            <div className="bg-img d-flex flex-column justify-content-center align-items-center">
                <div className="main-txt text-white lead display-2 mb-2">
                    Search For Events Tailored To Your Taste
                </div>
                <div>                
                    <Link to="/auth/signup" className="btn btn-danger btn-lg mr-3">Signup</Link>
                    <Link to="/auth/login" className="btn btn-danger btn-lg">Login</Link>
                </div>
            </div>
        )
    }
}

export default Base