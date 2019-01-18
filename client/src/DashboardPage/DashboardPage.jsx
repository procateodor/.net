import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

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
                <Navbar logged={true} prof={prof} history={this.props.history} user={user} />
                {prof ? (
                    <div className="container mt-4">
                        <div className="col-md-12">
                            <div className="row"><h3>Professor Dashboard</h3></div>
                            <div className="row">
                                {notifications && notifications.map((e, key) => (
                                    <div className="col-md-6 card" key={key}>
                                        <div className="card-body">
                                            <div className="curs1">
                                                <p className="name">{e.disciplineName}</p>
                                                <p className="description">{e.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                        <div className="container mt-4">
                            <div className="col-md-12">
                                <div className="row"><h3>Student Dashboard</h3></div>
                                <div className="row">
                                    {notifications && notifications.map((e, key) => (
                                        <div className="col-md-6 card" key={key}>
                                            <div className="card-body">
                                                <div className="curs1">
                                                    <p className="name">{e.disciplineName}</p>
                                                    <p className="description">{e.message}</p>
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