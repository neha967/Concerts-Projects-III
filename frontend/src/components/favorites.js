import React, {Component} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Favorite extends Component{

    constructor(props){
        super(props);

        this.state = {
            favorites: []
        }
    }

    componentDidMount(){

        let user = JSON.parse(localStorage.getItem("user"));

        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}/auth/favorites/${user._id}`
        })
        .then(response=>{
            this.setState({
                favorites: response.data
            })
        })
        .catch(error=>console.log(error))
    }

    deleteHandler = (eventId) => {
        let user = JSON.parse(localStorage.getItem("user"));

        axios({
            method: "POST",
            url: `${process.env.REACT_APP_API}/auth/favorites/delete/${user._id}/${eventId}`
        })
        .then(response=>{
            this.setState({
                favorites: response.data
            })
        })
        .catch(error=>console.log(error))
    }

    render(){
        return(
            <div className="d-flex flex-wrap container">
            {this.state.favorites.map(favorite=>(
                <div className="card m-3" style={{width: "330px"}}>
                        <img className="card-img-top" alt="" src={`https://images.sk-static.com/images/media/profile_images/artists/${favorite.artistId}/huge_avatar`}/>
                        <div className="card-body">
                            <h4 className="card-title">{favorite.artistName}</h4>
                            <p className="card-text">{favorite.venueName}</p>
                            <Link to={`/event-details/${favorite.eventId}`} className="btn btn-primary">Event Details</Link>
                            <button className="btn btn-primary float-right text-white" onClick={()=>this.deleteHandler(favorite.eventId)}>Remove Favorite</button>
                        </div>
                </div>
            ))
        }
        </div>
        )
    }
}

export default Favorite