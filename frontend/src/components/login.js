import React, { Component } from "react";
import axios from "../utils/axiosInstance"

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
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
            email: this.state.email,
            password: this.state.password
        }

        axios.post(`${process.env.REACT_APP_API}/auth/login`, user)
        .then((response) => {
            if(response.data.message){
                this.setState({
                    message: response.data.message
                })
            } else {
                localStorage.setItem("user", JSON.stringify(response.data))
                this.props.user();
                this.props.history.push("/home")}
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    render(){
        return(
            <div className="d-flex flex-column align-items-center justify-content-center bg-info login-div">
                {this.state.message ? <p className="text-danger p-2 bg-white font-weight-bolder border rounded border-white">{this.state.message}</p> : null}
                <form action="/auth/signup" method="POST" onSubmit={this.submitHandler} className="border border-dark rounded d-flex flex-column align-items-between ml-3 mr-n3 p-3 bg-light">
                    <h1 className="mb-3 pd-1">Why wait, login!!</h1>
                    <div>
                        <label for="email">Email</label>
                        <input type="email" name="email" className="ml-3 mb-2" onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <input type="password" name="password"  className="ml-3" onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-lg btn-primary">Login</button>
                    </div>
                    <a href="/auth/send-reset">Forgot Password?</a>
                </form>
            </div>
        )
    }
}

export default Login;