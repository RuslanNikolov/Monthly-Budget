import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getMonthly, updateBalance, deleteExpense } from '../../api/remote';
import Expense from './Expense'
import toastr from 'toastr'

export default class MonthlyList extends Component {
    constructor(props) {
        super(props);

        this.state = {

            income: 0,
            budget: 0,
            expenses: [],


            month: this.props.match.params.month,
            year: this.props.match.params.year,
        };
        this.getData = this.getData.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.deleteExpense = this.deleteExpense.bind(this);

    }

    async deleteExpense(id) {

        const res = await deleteExpense(id);
        if (!res.success) {
            toastr.error("Couldn't delete the expense!")
            return;
        }
        else{
            toastr.success('Expense deleted!')
        }
        this.setState({ expenses: this.state.expenses.filter(h => h.id != id) });
        this.getData();
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        this.getData();
    }
    async getData() {
        const data = await getMonthly(this.state.year, this.state.month);

        this.setState({
            budget: data.budget,
            income: data.income,
            expenses: data.expenses
        });

    }
    async onSubmitHandler(e) {
        e.preventDefault();
        if (!Number(this.state.income) || !Number(this.state.budget)) {
            toastr.error("Couldn't update!")
            return
        }

        const res = await updateBalance(this.state.year, this.state.month, Number(this.state.income), Number(this.state.budget));
        if (!res.success) {
            toastr.error("Couldn't update!")
            return;
        }
        else {
            toastr.success('Balance updated!')
        }

    }



    render() {
        let expenses = []
        if (this.state.expenses.length > 0) {
            this.state.expenses.map((e, i) =>
                expenses.push(<Expense deleteExpense={this.deleteExpense} id={e.id} key={i} name={e.name} category={e.category} amount={e.amount} year={e.year} month={e.month} date={e.date} />)
            )
        }
        let months = ['January','February','March','April','May','June','July','August','September','October','November','December']






        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Welcome to Budget Planner</h1>
                    </div>
                </div>
                <div className="row space-top ">
                    <div className="col-md-12 ">
                        <div className="card bg-secondary">
                            <div className="card-body">
                                <blockquote className="card-blockquote">
                                    <h2 id="month">{months[this.state.month - 1]} {this.state.year}</h2>
                                    <div className="row">
                                        <div className="col-md-3 space-top">
                                            <h4>Planner</h4>
                                            <form onSubmit={this.onSubmitHandler}>
                                                <div className="form-group">
                                                    <label className="form-control-label" htmlFor="income">Income:</label>
                                                    <input className="form-control" value={this.state.income} name="income" type="number" onChange={this.onChangeHandler} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-control-label" htmlFor="budget">Budget:</label>
                                                    <input className="form-control" value={this.state.budget} name="budget" type="number" onChange={this.onChangeHandler} />
                                                </div>
                                                <input type="submit" className="btn btn-secondary" value="Save" />
                                            </form>
                                        </div>  
                                        <div className="col-md-8 space-top">
                                            <div className="row">
                                                <h4 className="col-md-9">Expenses</h4>
                                                <Link to={'/plan/' + this.state.year + '/' + this.state.month + '/expense'} className="btn btn-secondary ml-2 mb-2">Add Expenses</Link>
                                            </div>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Category</th>
                                                        <th>Cost</th>
                                                        <th>Payment Date</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {expenses}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}