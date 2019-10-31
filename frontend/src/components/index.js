import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FacebookProvider, LoginButton } from 'react-facebook';
import axios from "../utils/axiosInstance"

class Base extends Component {

    constructor(props){
        super(props);
        this.state = {
            error: null
        }
    }

    handleResponse = (data) => {
        console.log(data)

        let user = {
            username: data.profile.name,
            email: data.profile.email,
            facebookId: data.profile.id
        }
    
        axios.post(`${process.env.REACT_APP_API}/auth/fb-login`, user)
        .then(response=>{
           localStorage.setItem("user", JSON.stringify(response.data))
           this.props.user()
           this.props.history.push("/home")
        })
        .catch(error=>{
            this.setState({error: error})
        })
    }
     
    handleError = (error) => {
        this.setState({ error });
      }

    render(){
        return(
            <div className="bg-img d-flex flex-column justify-content-center align-items-center">
                <div className="main-txt text-white lead display-2 mb-2">
                    Search For Events Tailored To Your Taste
                </div>
                <div className="mb-3">                
                    <Link to="/auth/signup" className="btn btn-danger btn-lg mr-3">Signup</Link>
                    <Link to="/auth/login" className="btn btn-danger btn-lg">Login</Link>
                </div>
                <FacebookProvider appId="928765154159482">
                    <LoginButton
                        scope="email"
                        onCompleted={this.handleResponse}
                        onError={this.handleError}
                    >
                    <span className="btn btn-primary btn-lg">Login via Facebook</span>
                    </LoginButton>
                </FacebookProvider>
            </div>
        )
    }
}

export default Base