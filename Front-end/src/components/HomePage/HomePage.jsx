import React, { Component } from 'react';   


export default class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            furniture:[]
        };
    }
     

    render() {
        
         return (
            <div className="container">
                <h1>Budget planner</h1>
            </div>
        );
    }
}