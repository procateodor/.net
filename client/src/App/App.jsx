import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { StudDisciplines } from '../StudDisciplines';
import { DisciplinePage } from '../DisciplinePage';
import { DashboardPage } from '../DashboardPage';
import {QuizPage} from '../QuizPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <React.Fragment>
                {
                    alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <Router history={history}>
                    <React.Fragment>
                        <PrivateRoute exact path="/" component={DashboardPage} />
                        <Route path="/landing" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <PrivateRoute exact path="/disciplines" component={StudDisciplines} />
                        <PrivateRoute exact path="/disciplines/:id" component={DisciplinePage} />
                        <PrivateRoute exact path="/disciplines/:id/:quizId" component={QuizPage} />
                    </React.Fragment>
                </Router>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 