import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class YearlyComp extends Component {

    render() {
        let year = (new Date()).getFullYear()
        let months = ['January','February','March','April','May','June','July','August','September','October','November','December']
        return(
            
                <div className="col-md-3 monthly">
                    <div className="card text-white bg-secondary">
                        <div className="card-body">
                            <blockquote className="card-blockquote">
                                <h2>{months[this.props.month - 1]}</h2>
                                <h4>{year}</h4>
                                <label htmlFor="budget">Budget:</label>
                                <input className="col-md-9" name="budget" value={this.props.budget} disabled/>
                                <label htmlFor="balance">Balance:</label>
                                <input className="col-md-9" name="balance" value={this.props.balance}/>
                                <div className="space-top">
                                <Link to={'/monthly/' + year + '/' +  this.props.month} className="btn btn-secondary">Details</Link>
                                </div>
                            </blockquote>
                        </div>
                    </div>
                </div>
                
                 

           
        )
    }
}