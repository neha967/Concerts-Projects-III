import React, { Component } from "react";
import axios from "axios";
import {Link} from "react-router-dom"; 

class Signup extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            message: ""
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault();

        let user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        axios.post(`${process.env.REACT_APP_API}/auth/signup`, user)
        .then((response) => {
            if(response.data.message) {
                this.setState({
                    message: response.data.message
                })
            } else {
                localStorage.setItem("user", JSON.stringify(response.data))
                this.props.user();
                this.props.history.push("/home")
            }
            
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    render(){
        return(
            <div className="d-flex flex-column align-items-center justify-content-center bg-info signup-div">
                {this.state.message ?<p className="border p-2 font-weight-bolder rounded border-white text-danger bg-white">{this.state.message}</p> :  null}
                <form action="/auth/signup" method="POST" className="border border-dark rounded d-flex flex-column align-items-between ml-3 mr-n3 p-3 bg-light" onSubmit={this.submitHandler}>
                    <h1>Come, Join Us!</h1>
                    <div className="py-3">
                        <label for="username">Username</label>
                        <input type="text" className="ml-3" name="username" onChange={this.changeHandler}/>
                    </div>
                    <div className="py-3">
                        <label for="email">Email</label>
                        <input type="email" className="ml-3" name="email" onChange={this.changeHandler}/>
                    </div>
                    <div className="py-3">
                        <label for="password">Password</label>
                        <input type="password" className="ml-3" name="password" onChange={this.changeHandler}/>
                    </div>
                    <div>
                    <button type="submit" className="btn btn-lg btn-primary">Create Account</button>
                    </div>                    
                    <p>Already got an account? <Link to="/auth/login">Login</Link></p>
                </form>
            </div>
        )
    }
}

export default Signup;