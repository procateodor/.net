import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            repassword: '',
            firstname: '',
            lastname: ''
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

        const { username, password, repassword, firstname, lastname } = this.state;
        const { dispatch } = this.props;
        if ((username && password && repassword && firstname && lastname) && (password === repassword)) {
            dispatch(userActions.register(username, password, firstname, lastname));
        }
    }

    render() {
        const { username, password, repassword, firstname, lastname } = this.state;
        return (
            <React.Fragment>
                <link rel="stylesheet" href="/src/RegisterPage/main.css"/>
                <div className="signup" id="sign-up">
                    <div className="signup--main-container">
                        <div className="signup--form-group">
                            <h1>Sign Up</h1>
                            <p>Create a new account and benefit by our services.</p>
                            <form id="form" className="signup--form" onSubmit={this.handleSubmit}>
                                <p id="err" className="error">&nbsp;</p>
                                <fieldset className="signup--form-field signup--input">
                                    <input autoComplete='off' type="text" id="email" tabIndex="0" name='username' value={username} onChange={this.handleChange} />
                                    <label htmlFor="email">
                                        <span data-text="E-mail Address">E-mail Address</span>
                                    </label>
                                </fieldset>

                                <fieldset className="signup--form-field signup--input">
                                    <input autoComplete='off' type="text" id="firstname" name='firstname' value={firstname} onChange={this.handleChange} />
                                    <label htmlFor="firstname">
                                        <span data-text="FirstName">FirstName</span>
                                    </label>
                                </fieldset>

                                <fieldset className="signup--form-field signup--input">
                                    <input autoComplete='off' type="text" id="lastname" name='lastname' value={lastname} onChange={this.handleChange} />
                                    <label htmlFor="lastname">
                                        <span data-text="LastName">LastName</span>
                                    </label>
                                </fieldset>

                                <fieldset className="signup--form-field signup--input">
                                    <input autoComplete='off' type="password" id="password" name='password' value={password} onChange={this.handleChange} />
                                    <label htmlFor="password">
                                        <span data-text="Password">Password</span>
                                    </label>
                                </fieldset>

                                <fieldset className="signup--form-field signup--input">
                                    <input autoComplete='off' type="password" id="repeat-password" name='repassword' value={repassword} onChange={this.handleChange} />
                                    <label htmlFor="repeat-password">
                                        <span data-text="Repeat Password">Repeat Password</span>
                                    </label>
                                </fieldset>

                                <div className="form-footer">
                                    <button className="signup--submit-btn" id="signup--submit-btn">
                                        <h1>Register</h1>
                                        <i className="fas fa-check signup--ok"></i>
                                    </button>
                                </div>

                                <div className="signup--bottom-side">
                                    Already have an account?
                        <br />
                                    <Link to='/login'>Log in</Link> | <Link to='/'>Home</Link>
                                </div>

                            </form>
                        </div>
                        <div className="signup--image">
                            <img src="/src/RegisterPage/signup.svg" alt="signup" />
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

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage }; 