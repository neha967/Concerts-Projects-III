import React, { Component } from "react";
import axios from "axios";
import Spots from "./spots";

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            keywords: "",
            venues: []
        }
    }

    changeHandler = (e) => {
        this.setState({
            keywords: e.target.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault();

        axios.get(`https://api.songkick.com/api/3.0/search/venues.json?query=${this.state.keywords}&apikey=${process.env.REACT_APP_KEY}`)
        .then(response=>{
            this.setState({
                venues: response.data.resultsPage.results.venue
            })
        })
        .catch(error=>{
            console.log(error)
        })
    }

    render(){
        return(
            <>
                {this.state.venues.length > 0  ?
                    <Spots venues={this.state.venues} /> :
                    <div className="bg-img d-flex flex-column justify-content-center align-items-center mb-3">
                        <div className="main-txt text-white lead display-2 mb-2">
                            Search For Events Tailored To Your Taste
                        </div>
                        <form className="form-inline d-flex flex-column text-black font-weight-bold" onSubmit={this.submitHandler}>
                            <input type="text" onChange={this.changeHandler} name="keywords" placeholder="Enter keywords" className="py-2 px-auto my-3"></input>
                            <button type="submit" className="btn btn-danger btn-lg">Search</button>
                        </form>
                    </div>
                }
            </>
        )
    }
}

export default Home