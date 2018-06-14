import React, { Component } from 'react';
import Input from '../common/Input';
import { login } from '../../api/remote';
import { withRouter } from 'react-router-dom';
import toastr from 'toastr'

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e) {
        e.preventDefault();
        if(this.state.email.length === 0){
            toastr.warning('Email cannot be empty!')
            return
        }
        if(this.state.password.length === 0){
            toastr.warning('Password cannot be empty!')
            return
        }
        if(this.state.password.length >0 && this.state.password.length <4)
        {
            toastr.warning('Password needs to be at least 4 letters!')
            return;
        }
        const res = await login(this.state.email, this.state.password);
        if (!res.success) {
            this.setState({error: res});
            toastr.error('No such user!')

            return;
        }
        localStorage.setItem('authToken', res.token);
        this.props.history.push('/');   
        toastr.success('Logged in!')   
    }

    render() {
        return (
            <div className="container">
                <h1>Login</h1>
                <form onSubmit={this.onSubmitHandler}>
                    <Input
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeHandler}
                        label="E-mail"
                    />
                    <Input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChangeHandler}
                        label="Password"
                    />
                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
            </div>
        );
    }
}

export default withRouter(LoginPage);