import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

import sha256 from "crypto-js/sha256";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, sha256(password).toString()));
        }
    }

    render() {
        const { username, password } = this.state;
        return (
            <React.Fragment>
                <link rel="stylesheet" href="/src/LoginPage/main.css" />
                <div className="signin" id="sign-up">
                    <div className="signin--main-container">
                        <div className="signin--image">
                            <img src="/src/LoginPage/signup.svg" alt="signin" />
                        </div>
                        <div className="signin--form-group">
                            <h1>Sign In</h1>
                            <p>Sign In and benefit by our services.</p>
                            <form className="signin--form" id="form" onSubmit={this.handleSubmit}>
                                <p id="err" className="error">&nbsp;</p>
                                <fieldset className="signin--form-field signin--input">
                                    <input autoComplete="off" type="text" value={username} id="email" tabIndex="0" name="username" onChange={this.handleChange} />
                                    <label htmlFor="email">
                                        <span data-text="E-mail Address">E-mail Address</span>
                                    </label>
                                </fieldset>
                                <fieldset className="signin--form-field signin--input">
                                    <input autoComplete="off" type="password" id="password" value={password} name="password" onChange={this.handleChange} />
                                    <label htmlFor="password">
                                        <span data-text="Password">Password</span>
                                    </label>
                                </fieldset>

                                <div className="signin--footer-form">
                                    <button type="submit" className="signin--submit-btn" id="signin--submit-btn">
                                        <h1>Sign In</h1>
                                        <i id="signin--ok" className="fas fa-check signin--ok"></i>
                                    </button>
                                </div>

                                <div className="signin--forgot">
                                    <a href="">
                                        Forgot Password?
                                    </a>
                                </div>

                                <div className="signin--bottom-side">
                                    Don't have an account?
                                    <br />
                                    <Link to='/register'>Register</Link> | <Link to='/'>Home</Link>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 