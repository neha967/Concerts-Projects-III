import React, { Component } from "react";
import axios from "../utils/axiosInstance"

class Reset extends Component{

    constructor(props){
        super(props);
        this.state = {
            password: ""
        }
    }

    changeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    componentDidMount(){
        this.props.user()
    }

    submitHandler = (e) => {
        e.preventDefault();

        let password = this.state.password

        axios.post(`${process.env.REACT_APP_API}/auth/reset-password?token=${this.props.match.params.token}`, {password})
        .then(response=>{
            this.props.history.push("/auth/login")
        })
        .catch(error=>console.log(error))
    }

    render(){
        return(
            <div className="d-flex flex-column align-items-center justify-content-center reset-div">
            <form method="POST" onSubmit={this.submitHandler} className="border border-dark rounded d-flex flex-column align-items-center justify-content-around ml-3 mr-n3 p-3 bg-light">
                <div class="form-group">
                    <label for="password">
                    <span className="text-danger font-weight-bold lead">Password <sup>*</sup>8 characters, at least 1 number and 1 letter</span>
                    </label>
                    <input type="password" name="password" onChange={this.changeHandler} pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                           value={this.state.password} placeholder="Your New Password" class="form-control" required/>
                </div>
                <button type="submit" class="btn btn-primary" id="reset-btn">Reset Password</button>
            </form>  
            </div>
        )
    }
}

export default Reset