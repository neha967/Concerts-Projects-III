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

    componentDidMount(){
        this.props.user()
    }

    submitHandler = (e) => {
        e.preventDefault();

        let email = this.state.email

        axios.post(`${process.env.REACT_APP_API}/auth/send-reset`, {email})
        .then(response=>{
            debugger
            this.setState({
                successMessage: response.data
            })
        })
        .catch(error=>console.log(error))
    }

    render(){
        return(
            <div className="d-flex flex-column align-items-center justify-content-center send-div">
            <form method="POST" onSubmit={this.submitHandler} className="border border-dark rounded d-flex flex-column align-items-center justify-content-around ml-3 mr-n3 p-3 bg-light">
                <div>
                    <h1 className="text-success font-weight-bold">Reset Your Password Here!</h1>
                </div>
                <div>
                    <p id="display" className="text-center text-warning">{this.state.successMessage}</p>
                </div>
                <div>
                <label for="email">Email</label>
                <input type="email" name="email" placeholder="Your email" className="ml-3 mb-3" onChange={this.changeHandler} required/><br/>
                </div>
                <div>
                <button type="submit" className="btn btn-primary" id="send-btn">Send Reset Link</button>
                </div>
            </form>
            </div>
        )
    }
}

export default SendReset