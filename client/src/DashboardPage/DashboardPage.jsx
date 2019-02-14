import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

import moment from 'moment';

import { Navbar } from '../Navbar';

class DashboardPage extends React.Component {
    constructor(props) {
        super(props);

        const { match: { params } } = this.props;

        const user = JSON.parse(localStorage.getItem('user'));

        this.state = {
            userId: user.id,
            prof: user.role === 1 ? true : false,
            disciplineId: params.id,
            details: {},
            courses: [],
            labs: [],
            user,
            notifications: []
        };
    }

    componentDidMount() {
        fetch(`http://127.0.0.1:6969/api/professor/notifications/${this.state.user.id}`).then(this.handleResponse).then(response => {
            if (response.success) {
                this.setState({ notifications: response.items });
            }
        });
    }

    handleResponse(response) {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                    // auto logout if 401 response returned from api
                    logout();
                    location.reload(true);
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        });
    }

    render() {
        const { prof, user, notifications } = this.state;
        return (
            <React.Fragment>
                <link rel="stylesheet" href="/src/DashboardPage/main.css" />
                <Navbar logged={true} prof={prof} history={this.props.history} user={user} />

                <img className="sign2" src="/src/HomePage/images/2.svg" alt="2" id="sign2" />
                <img className="sign3" src="/src/HomePage/images/3.svg" alt="3" id="sign3" />
                <img className="sign4" src="/src/HomePage/images/4.svg" alt="3" id="sign7" />
                {prof ? (
                    <div className="container mt-4">
                        <div className="row">
                            <div className="col-12">
                                <h3 className="titlePage">Professor Dashboard</h3>
                            </div>
                        </div>
                        <div className="row">
                            {notifications && notifications.reverse().map((e, key) => (
                                <div className="col-md-6 container-notification" key={key}>
                                    <div className="card">
                                        <div className={new Date(e.updated).valueOf() + 1000 * 60 * 60 * 24 > new Date().valueOf() ? "card-body new" : "card-body"}>
                                            <div className="curs1">
                                                <p className="name">{e.disciplineName}</p>
                                                <p className="description">{e.message}</p>
                                                <small className="date">{moment(new Date(e.updated).valueOf()).fromNow()}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                        <div className="container mt-4">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-12">
                                        <h3 className="titlePage">Student Dashboard</h3>
                                    </div>
                                </div>
                                <div className="row">
                                    {notifications && notifications.reverse().map((e, key) => (
                                        <div className="col-md-6 container-notification" key={key}>
                                            <div className="card">
                                                <div className={new Date(e.updated).valueOf() + 1000 * 60 * 60 * 24 > new Date().valueOf() ? "card-body new" : "card-body"}>
                                                    <div className="curs1">
                                                        <p className="name">{e.disciplineName}</p>
                                                        <p className="description">{e.message}</p>
                                                        <small className="date">{moment(new Date(e.updated).valueOf()).fromNow()}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedDashboardPage = connect(mapStateToProps)(DashboardPage);
export { connectedDashboardPage as DashboardPage };