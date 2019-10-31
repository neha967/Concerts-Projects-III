import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {Link} from "react-router-dom";
import Nav from "./nav";

class Spots extends Component{

    constructor(props){
        super(props);
        this.state = {
            venues: this.props.venues,
            filteredVenues: []
        }
    }

    changeHandler = (e) => {
          
        let searchQuery = e.target.value;

        var showVenues = (
            this.state.venues.filter(venue => (
                venue.metroArea.displayName.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
            ))
        )

        this.setState({
            filteredVenues: showVenues
        })

    }

    render(){
        return(
            <>
            {this.state.filteredVenues.length > 0 ? 
                <div>
                <Nav/>
                <input type="text" placeholder="Filter by city" onChange={this.changeHandler}/>
                {this.state.filteredVenues.map(venue=>(                
                <div className="border border-top-0 border-right-0 border-left-0 my-3 p-3">
                    <h3 className="text-primary">{venue.displayName}</h3>
                    <p><span className="font-weight-bold">Hosting city:</span>{venue.metroArea.displayName}, {venue.metroArea.country.displayName}</p>
                    <Link to={`/events/${venue.id}`} className="btn btn-primary">Check Events</Link>
                </div>
            ))}
            </div>
            :
            <div>
                <Nav/>
                <input type="text" placeholder="Filter by city" onChange={this.changeHandler}/>
                {this.state.venues.map(venue=>(               
                <div className="border border-top-0 border-right-0 border-left-0 my-3 p-3">
                    <h3 className="text-primary">{venue.displayName}</h3>
                    <p><span className="font-weight-bold">Hosting city:</span>{venue.metroArea.displayName}, {venue.metroArea.country.displayName}</p>
                    <Link to={`/events/${venue.id}`} className="btn btn-primary">Check Events</Link>
                </div>
            ))}
            </div>
            }
            </>
        )
    }
}

export default withRouter(Spots)

// {this.props.venues.map(venue=>(
//     <>
//     <div className="border border-top-0 border-right-0 border-left-0 my-3 p-3">
//         <h3 className="text-primary">{venue.displayName}</h3>
//         <p><span className="font-weight-bold">Hosting city:</span>{venue.metroArea.displayName}, {venue.metroArea.country.displayName}</p>
//         <Link to={`/events/${venue.id}`} className="btn btn-primary">Check Events</Link>
//     </div>
//     </>
// ))}