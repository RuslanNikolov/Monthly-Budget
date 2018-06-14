import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from './components/common/Header';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import HomePage from './components/HomePage/HomePage';
import YearlyList from './components/YearlyList/YearlyList';
import MonthlyList from './components/MonthlyList/MonthlyList';
import PrivateRoute from './components/common/PrivateRoute';
import AddExpensePage from './components/MonthlyList/AddExpense';


class App extends Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        localStorage.clear();
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="App">
                <Header loggedIn={localStorage.getItem('authToken') != null} onLogout={this.onLogout} />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/view/:page" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <PrivateRoute path="/monthly/:year/:month" component={MonthlyList} />
                    <PrivateRoute path="/plan/:year/:month/expense" component={AddExpensePage} />
                    <Route path="/register" component={RegisterPage} />
                    <PrivateRoute path="/balances" component={YearlyList} />
                </Switch>
                
            </div>
        );
    }
}

export default withRouter(App);