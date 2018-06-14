import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import YearlyComp from './YearlyComp'
import { getYearly } from '../../api/remote';

export default class YearlyList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            balances: {}
        };
     this.getData = this.getData.bind(this)

    }

     componentDidMount() {
         this.getData();
     }

    async getData() {
        let year = new Date().getFullYear()
        const data = await getYearly(year);
       
        this.setState({ balances: data });
    }



    render() {
        let main = <p>Yes</p>
        let arr = []
        for (let key in this.state.balances) {
            arr.push(this.state.balances[key])
           
            
         }

  

        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Yearly Balance</h1>
                    </div>
                </div>
                <div >
                {arr.map((e,i)=>{
                    return (<YearlyComp class="monthly" month={i+1} key={i} budget={e.budget} balance={e.balance} />)
                })}
                </div>
                

            </div>
        );
    }
}