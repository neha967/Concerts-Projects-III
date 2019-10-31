import React, { Component } from "react";
import axios from "axios"
import Axios from "../utils/axiosInstance";
import { Link } from "react-router-dom";

class Event extends Component {

    constructor(props){
        super(props);
        this.state = {
            events: [],
            favorites: [],
            hover: false,
            selectedEvents: []
        }
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'))
        let venueId = this.props.match.params.id
        
        axios.get(`https://api.songkick.com/api/3.0/venues/${venueId}/calendar.json?apikey=${process.env.REACT_APP_KEY}`)
        .then(external=>{
            
            Axios({
                method: "GET",
                url: `${process.env.REACT_APP_API}/auth/favorites/${user._id}`
            })
            .then(response=>{
                this.setState({
                    favorites: response.data,
                    events: external.data.resultsPage.results.event,

                })
            })
            .catch(error=>console.log(error))
        })
        .catch(error=>{
            console.log(error)
        })
    }

    componentDidUpdate(prevState){
        let user = JSON.parse(localStorage.getItem('user'))

        Axios.get(`${process.env.REACT_APP_API}/auth/favorites/${user._id}`)
        .then(response=>{
            if(prevState.favorites !== response.data){
                this.setState({
                    favorites: response.data
                })
            }
        })
    }

    clickHandler = (image, artistName, venueName, eventId, artistId) => {
        
        let user = JSON.parse(localStorage.getItem('user'))

        
        let favoritesCopy = [...this.state.favorites]

        favoritesCopy.push(eventId)

        this.setState({
            favorites: favoritesCopy
            })

        Axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}/auth/add/${user._id}?image=${image}&artistName=${artistName}&venueName=${venueName}&eventId=${eventId}&artistId=${artistId}`
        })
        .then(response=>{
            console.log(response);
        })
        .catch(error=>{
            console.log(error);
        })
    }

    displayHeart = (event) => {
        for(let i = 0; i < this.state.favorites.length; i++){
            if(this.state.favorites[i].eventId === event.id){
                return true
            }
        }
        return false
    }

    toggleHover = (eventId) => {
        
        Axios.get(`${process.env.REACT_APP_API}/auth/favorites/hover/${eventId}`)
        .then(response=>{                     
            this.setState({
                selectedEvents: response.data,
                hover: eventId
            })
        })
        .catch(error=>{             
            console.log(error)
        })
    }

    deleteHandler = (eventId) => {
        
        let user = JSON.parse(localStorage.getItem("user"));

        Axios({
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

    clearHoverState = () => {
        this.setState({
            hover: false
        })
    }

    render(){
        return(
            <>
            <div className="d-flex flex-wrap container">
            {!this.state.events ? 
                <div className="border bg-light border-primary text-white w-50 h-50 p-3 my-3">
                    <h1 class="oops">Oops!<span>There are no events for the chosen venue...!!</span></h1><br></br>
                    <Link className="btn btn-primary mt-3" to="/home">Take Me Back Please!!!</Link>
                </div>
            :
            <>
                {this.state.events.map(event=>(                    
                    <div className="card m-3" style={{width: "330px"}}>
                        <img className="card-img-top" alt="" src={`https://images.sk-static.com/images/media/profile_images/artists/${event.performance[0].artist.id}/huge_avatar`}/>
                        <div className="card-body">
                            <h4 className="card-title">{event.performance[0].artist.displayName}</h4>
                            <p className="card-text">{event.venue.displayName}</p>
                            <Link to={`/event-details/${event.id}`} className="btn btn-primary">Event Details</Link>
                            {this.displayHeart(event) ? 
                            (
                            <>
                            <div onMouseEnter={()=>this.toggleHover(event.id)} onMouseLeave={this.clearHoverState} className="h-50">
                            <i onClick={()=>this.deleteHandler(event.id)} className="fa fa-heart float-right btn-lg" style={{color: "red"}}></i>
                            </div>
                            {this.state.hover === event.id ? 
                            <div className="border w-75 mt-2 ml-3">
                                <h4>People with common interests!!</h4>
                                {this.state.selectedEvents.map(event=>(                                    
                                    <li className="lead font-weight-bold">{event.userId.username}</li>
                                ))}
                            </div>                            
                            : ""}
                            </>
                            )
                            : <div className="h-50"><i className="fa fa-heart float-right btn-lg" style={{color: "black"}} name={event.id} onClick={() => {this.clickHandler(event.performance[0].artist.uri, event.performance[0].artist.displayName, event.venue.displayName, event.id, event.performance[0].artist.id)}}></i></div>}
                        </div>
                    </div>
                ))}
                </>
                }
            </div>
            </>
        )
    }
}

export default Event