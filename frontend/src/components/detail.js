import React, { Component } from "react";
import axios from "axios"
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import Media from "react-media";

const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1IjoibmloYXJpa2E5NTIxOCIsImEiOiJjazIzYmw2NDMxczVhM3B1Z3I1c2RmMXd2In0.IKDbblC0k7rWIvwpIohgsA'
  });

class Detail extends Component {

    constructor(props){
        super(props);
        this.state = {
            details: {
                start: {
                    date: "",
                    time: ""
                },
                performance: [{
                    artist: {}
                }],
                venue: {
                    metroArea: {
                        displayName: "",
                        country: {}
                    }
                },
                location: {}
            }
        }
    }

    componentDidMount() {

        let eventId = this.props.match.params.id

        axios.get(`https://api.songkick.com/api/3.0/events/${eventId}.json?apikey=${process.env.REACT_APP_KEY}`)
        .then(response=>{
            this.setState({
                details: response.data.resultsPage.results.event
            })
        })
        .catch(error=>{
            console.log(error)
        })
    }


    render(){
        let lat = this.state.details.location.lat;
        let lng = this.state.details.location.lng;

        return(
            <>
            <div className="d-flex justify-content-around align-items-center detail-div">
                <img className="each" src={`https://images.sk-static.com/images/media/profile_images/artists/${this.state.details.performance[0].artist.id}/huge_avatar`} alt=""/>
                <div className="bg-light text-dark p-4 d-flex flex-column justify-content-around">
                <div>
                    <h2><strong>Event Name:</strong> {this.state.details.displayName}</h2>
                    <h2><strong>Event Date:</strong> {this.state.details.start.date}</h2>
                    <h2><strong>Popularity:</strong> {this.state.details.popularity}</h2>
                    <h2><strong>Event Time:</strong> {this.state.details.start.time}</h2>
                    <h2><strong>Event Hosted At:</strong> {this.state.details.venue.metroArea.displayName}, {this.state.details.venue.metroArea.country.displayName}</h2>
                    <h2><strong>Website:</strong> <a href={this.state.details.venue.website} className="text-decoration-none">{this.state.details.venue.website}</a></h2>
                    </div>

                    {/* {lat ?
                    <Map
                    center= {[lng, lat]}
                    style="mapbox://styles/mapbox/streets-v9"
                    containerStyle={{
                        height: '50vh',
                        width: '45vw' 
                                    }}
                    >
                    <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                        <Feature coordinates={[{lng}, {lat}]} />
                    </Layer>
                    </Map> : null} */}

                    {lat ?
                    <Media queries={{ mobile: {maxWidth: 640}}}>
                        {matches => { 
                        console.log(matches.mobile)
                            return matches.mobile ? (
                                <Map      
                                    center= {[lng, lat]}
                                    style="mapbox://styles/mapbox/streets-v9"
                                    containerStyle={{
                                        height: '50vh',
                                        width: '80vw' 
                                                    }}
                                    >
                                    <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                                        <Feature coordinates={[{lng}, {lat}]} />
                                    </Layer>
                                </Map>
                            ) : (
                                <Map      
                                    center= {[lng, lat]}
                                    style="mapbox://styles/mapbox/streets-v9"
                                    containerStyle={{
                                        height: '50vh',
                                        width: '45vw' 
                                                    }}
                                    >
                                    <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                                        <Feature coordinates={[{lng}, {lat}]} />
                                    </Layer>
                                    </Map>
                            )}}</Media>                    
                    : null}
                </div>
            </div>
            </>
        )
    }
}

export default Detail