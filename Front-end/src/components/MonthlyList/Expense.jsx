import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Expense extends Component {
 render(){
     return (
        <tr>
        <td>{this.props.name}</td>
        <td>{this.props.category}</td>
        <td>{this.props.amount}</td>
        <td>{this.props.date}-{this.props.month}-{this.props.year}</td>
        <td>
            
            <a href="javascript:void(0)"className="btn btn-secondary" onClick={()=>this.props.deleteExpense(this.props.id)}>Delete</a>
        </td>
    </tr>
     )
 }
}