import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Event extends Component {

    constructor(props){
        super(props);
        this.state = {
            events: [],
            favorites: []
        }
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'))
        let venueId = this.props.match.params.id
        
        //request backend to get favvorites collection related to user and update state

        axios.get(`https://api.songkick.com/api/3.0/venues/${venueId}/calendar.json?apikey=${process.env.REACT_APP_KEY}`)
        .then(response=>{
            this.setState({
                events: response.data.resultsPage.results.event,
                favorites: user.favorites
            })
        })
        .catch(error=>{
            console.log(error)
        })
    }

    componentDidUpdate(prevState){
        let user = JSON.parse(localStorage.getItem('user'))

        axios.get(`${process.env.REACT_APP_API}/auth/favorites/${user._id}`)
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

        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}/auth/add/${user._id}?image=${image}&artistName=${artistName}&venueName=${venueName}&eventId=${eventId}&artistId=${artistId}`
            // withCredentials: true
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
                            {this.displayHeart(event) ? <i onClick={()=>this.deleteHandler(event.id)} className="fa fa-heart float-right btn-lg" style={{color: "red"}}></i> : <i className="fa fa-heart float-right btn-lg" style={{color: "black"}} name={event.id} onClick={() => {this.clickHandler(event.performance[0].artist.uri, event.performance[0].artist.displayName, event.venue.displayName, event.id, event.performance[0].artist.id)}}></i>}
                           {/* {this.state.favorites.includes(event.id) ? <i className="fa fa-heart float-right btn-lg" style={{color: "red"}}></i> : <i className="fa fa-heart float-right btn-lg" style={{color: "black"}} name={event.id} onClick={() => {this.clickHandler(event.performance[0].artist.uri, event.performance[0].artist.displayName, event.venue.displayName, event.id, event.performance[0].artist.id)}}></i>}  */}
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

//doing unclick for removing favorite