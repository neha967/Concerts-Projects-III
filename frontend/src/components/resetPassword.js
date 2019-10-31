import React, { Component } from "react";

class Reset extends Component{

    submitHandler = (e) => {
        e.preventDefault();

        this.props.user()

        this.props.history.push("/send-reset")
    }

    render(){
        return(
            <form action="{{{config.host}}}/auth/reset-password" method="POST" onSubmit={this.submitHandler}>
                <div class="form-group">
                    <label for="password">
                    <span>Password</span>
                    <span>*8 characters, at least 1 number and 1 letter</span>
                    </label>
                    <input type="password" name="password" pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                           placeholder="Your New Password" class="form-control" required/>
                    <input type="text" hidden name="token" value="{{token}}"/>
                </div>
                <button type="submit" class="btn btn-primary" id="reset-btn">Reset Password</button>
            </form>  
        )
    }
}

export default Reset