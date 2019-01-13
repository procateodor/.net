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
            user
        };
    }

    render() {
        const { prof, user } = this.state;
        return (
            <React.Fragment>
                <Navbar logged={true} prof={prof} history={this.props.history} user={user} />
                {prof ? (
                    <div className="container mt-4">
                        <div className="col-md-12">
                            <div className="row"><h3>Professor Dashboard</h3></div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="curs1">
                                            <p className="name">Course 1</p>
                                            <p className="description">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                                Blanditiis, aspernatur illum beatae architecto cum vel velit dignissimos quae voluptate
                                nesciunt perspiciatis nulla error! Quo assumenda fugit suscipit illo rem laboriosam.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="curs1">
                                            <p className="name">Course 1</p>
                                            <p className="description">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                                Blanditiis, aspernatur illum beatae architecto cum vel velit dignissimos quae voluptate
                                nesciunt perspiciatis nulla error! Quo assumenda fugit suscipit illo rem laboriosam.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                        <div className="container mt-4">
                            <div className="col-md-12">
                                <div className="row"><h3>Student Dashboard</h3></div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="curs1">
                                                <p className="name">Course 1</p>
                                                <p className="description">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                                    Blanditiis, aspernatur illum beatae architecto cum vel velit dignissimos quae voluptate
                                nesciunt perspiciatis nulla error! Quo assumenda fugit suscipit illo rem laboriosam.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="curs1">
                                                <p className="name">Course 1</p>
                                                <p className="description">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                                    Blanditiis, aspernatur illum beatae architecto cum vel velit dignissimos quae voluptate
                                nesciunt perspiciatis nulla error! Quo assumenda fugit suscipit illo rem laboriosam.</p>
                                            </div>
                                        </div>
                                    </div>
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