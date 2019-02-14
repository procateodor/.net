import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        const { logged, prof, user } = this.props;

        this.state = {
            logged,
            prof,
            user
        }
    }

    logout() {
        const { dispatch } = this.props;
        dispatch(userActions.logout());

        this.props.history.push(`/`);
    }

    render() {
        const { logged, prof, user } = this.state;
        return (
            <React.Fragment>
                {!logged ? '' : (<link rel="stylesheet" href="/src/HomePage/main.css" />)}
                <div className="container">
                    <nav id="navContainer">
                        <div className="row">
                            <div className="col-lg-6 col-md-8">
                                <ul id="rightMenu">
                                    <li><Link to="/">{logged ? 'Dashboard' : 'Home'}</Link></li>
                                    {!logged ? (
                                        <React.Fragment>
                                            <li><a href="/">How it works</a></li>
                                            <li><a href="/">Despre</a></li>
                                            <li><a href="/">Contact</a></li>
                                        </React.Fragment>
                                    ) : (
                                            <React.Fragment>
                                                {prof ? (
                                                    <React.Fragment>
                                                        <li><Link to="/disciplines">My Disciplines</Link></li>
                                                    </React.Fragment>
                                                ) : (
                                                        <React.Fragment>
                                                            <li><Link to="/disciplines">Disciplines</Link></li>
                                                        </React.Fragment>
                                                    )}
                                            </React.Fragment>
                                        )}
                                </ul>
                            </div>
                            <div className="col-lg-6 col-md-4">
                                <ul id="leftMenu">
                                    {!logged ? (
                                        <React.Fragment>
                                            <li><Link to='/login'>Login</Link></li>
                                            <li><Link to='/register'>Register</Link></li>
                                        </React.Fragment>
                                    ) : (
                                            <React.Fragment>
                                                {logged ? `Logged as ${user.lastName} ${user.firstName} | ` : ''}
                                                <li onClick={this.logout.bind(this)}><a>Logout</a></li>
                                            </React.Fragment>
                                        )}
                                </ul>
                            </div>
                        </div>
                    </nav>
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

const connectedNavbar = connect(mapStateToProps)(Navbar);
export { connectedNavbar as Navbar }; 