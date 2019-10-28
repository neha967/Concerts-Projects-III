import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {Link} from "react-router-dom";
import Nav from "./nav";

class Spots extends Component{

    render(){
        return(
            <div>
            <Nav/>
            {this.props.venues.map(venue=>(
                <>
                <div className="border border-top-0 border-right-0 border-left-0 my-3 p-3">
                    <h3 className="text-primary">{venue.displayName}</h3>
                    <p><span className="font-weight-bold">Hosting city:</span>{venue.metroArea.displayName}, {venue.metroArea.country.displayName}</p>
                    <Link to={`/events/${venue.id}`} className="btn btn-primary">Check Events</Link>
                </div>
                </>
            ))}
            </div>
        )
    }
}

export default withRouter(Spots)