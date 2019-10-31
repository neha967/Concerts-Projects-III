import React, { Component } from "react";
import axios from "../utils/axiosInstance"

class SendReset extends Component{

    constructor(){
        super();
        this.state= {
            email: "",
            successMessage: ""
        }
    }

    changeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault();

        this.props.user()

        let email = this.state.email

        axios.post(`${process.env.REACT_APP_API}/auth/send-reset`, {email})
        .then(response=>{
            debugger
            this.setState({
                successMessage: response.data
            })
            this.props.history.push("/auth/reset-password")
        })
        .catch(error=>console.log(error))
    }

    render(){
        return(
            <form method="POST" onSubmit={this.submitHandler}>
                <div class="form-group">
                <label for="email">Email</label>
                <input type="email" name="email"
                placeholder="Your email" class="form-control" onChange={this.changeHandler} required/><br/>
                </div>
                <p id="display" class="text-center text-warning">{this.state.successMessage}</p>
                <button type="submit" class="btn btn-primary" id="send-btn">Send Reset Link</button>
            </form>
        )
    }
}

export default SendReset