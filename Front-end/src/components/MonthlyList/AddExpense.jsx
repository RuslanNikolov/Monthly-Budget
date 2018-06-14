import React, { Component } from 'react';   
import {createExpense} from '../../api/remote';
import { withRouter } from 'react-router-dom';
import toastr from 'toastr'


 class AddExpense extends Component {
    constructor(props){
        super(props)
        this.state ={
            name:'',
            category:'',
            amount:0,
            date:'',
            month: this.props.match.params.month,
            year: this.props.match.params.year,
        }
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }
    async onSubmitHandler(e) {
        e.preventDefault();
        if(!this.state.name){
            toastr.warning('Name is empty!')
            return
        }
        if(this.state.category.length ===0){
            toastr.warning('Choose category!')
            return
        }
        if(!this.state.amount){
            toastr.warning('Cost is empty!')
            return
        }
        if(!this.state.date){
            toastr.warning('Payment date is empty!')
            return
        }
        
        let res = await createExpense(this.state.name,this.state.category,Number(this.state.amount),Number(this.state.date),this.state.year,this.state.month)
        if (!res.success) {
            toastr.error("Couldn't create an expense!")
            console.log(res)
            return;
        }
        else{
            toastr.success('Expense created!')
        }
        this.props.history.push(`/monthly/${this.state.year}/${this.state.month}`);
        
    }
    
    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    
    
    render(){
        return (<div className="container">
        <div className="row space-top">
            <div className="col-md-12">
                <h1>Add Expenses</h1>
                <h3>November 2017</h3>
            </div>
        </div>
        <div className="row space-top">
            <div className="col-md-10">
                <form onSubmit={this.onSubmitHandler}>
                    <legend>Add a new expense</legend>
                    <div className="form-group">
                        <label className="col-md-2" htmlFor="name">Name:</label>
                        <input value={this.state.name} onChange = {this.onChangeHandler} className="col-md-2" name="name" type="text" />
                    </div>
                    <div className="form-group">
                        <label className="col-md-2" htmlFor="category">Category:</label>
                        <select value={this.state.category} onChange = {this.onChangeHandler} className="col-md-2 pl-2" name="category">
                            <option>Non-essential</option>
                            <option>Fixed</option>
                            <option>Variable</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2" htmlFor="cost">Cost:</label>
                        <input value={this.state.amount} onChange = {this.onChangeHandler} className="col-md-2" name="amount" type="number" />
                    </div>
                    <div className="form-group">
                        <label className="col-md-2" htmlFor="paymentDate">Payment Date:</label>
                        <input value={this.state.date} onChange = {this.onChangeHandler} className="col-md-2" name="date" type="text" />
                    </div>
                    <input type="submit" className="btn btn-secondary" value="Add" />
                </form>
            </div>
        </div>
    </div>)
    }
}
export default withRouter(AddExpense);
