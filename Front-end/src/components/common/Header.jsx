import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
    render() {
        const { loggedIn, onLogout } = this.props;
        let month = new Date().getMonth() + 1 
        let year = new Date().getFullYear()
        
       

        return (
            
            <header>
                <NavLink exact to="/" activeClassName="active">Home</NavLink>
                {loggedIn && <a href="javascript:void(0)" onClick={onLogout}>Logout</a>}
                {loggedIn && <NavLink to="/balances" activeClassName="active">Yearly Balance</NavLink>}
                {loggedIn && <NavLink to={"/monthly/" + year + '/' + month} activeClassName="active">Monthly Balance</NavLink>}
                {!loggedIn && <NavLink to="/login" activeClassName="active">Login</NavLink>}
                {!loggedIn && <NavLink to="/register" activeClassName="active">Register</NavLink>}
            
            </header>
        );
    }
}