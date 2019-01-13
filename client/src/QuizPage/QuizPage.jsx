import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

import { Navbar } from '../Navbar';

class QuizPage extends React.Component {
    constructor(props) {
        super(props);

        const { match: { params } } = this.props;

        const user = JSON.parse(localStorage.getItem('user'));

        this.state = {
            prof: user.role === 1 ? true : false,
            disciplineId: params.id,
            quizId: params.quizId,
            user,
            time: '',
            userId: user.id,
            title: '',
            questions: [],
            min: 0,
            sec: 0,
            submitted: false,
            responses: [],
            profResponses: []
        };
    }

    componentDidMount() {
        const requestOptions = {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        };

        if (!this.state.prof) {
            fetch(`http://127.0.0.1:6969/api/students/disciplines/${this.state.disciplineId}/${this.state.quizId}/answer?userId=${this.state.user.id}`, requestOptions).then(this.handleResponse).then(response => {
                if (response.success) {
                    if (response.data) {
                        this.setState({ submitted: true, responses: response.data.responses });
                    }

                    fetch(`http://127.0.0.1:6969/api/professor/disciplines/${this.state.disciplineId}/${this.state.quizId}`, requestOptions).then(this.handleResponse).then(response => {
                        if (response.success) {
                            this.setState({ ...response.data });

                            this.interval = setInterval(() => {
                                const date = this.calculateCountdown(this.state.time);
                                date ? this.setState(date) : this.stop();
                            }, 1000);

                            this.getAnswersStud();
                        }
                    });
                }
            });
        } else {
            fetch(`http://127.0.0.1:6969/api/professor/disciplines/${this.state.disciplineId}/${this.state.quizId}/answer`, requestOptions).then(this.handleResponse).then(response => {
                if (response.success) {
                    if (response.data) {
                        this.setState({ profResponses: response.data });
                    }

                    fetch(`http://127.0.0.1:6969/api/professor/disciplines/${this.state.disciplineId}/${this.state.quizId}`, requestOptions).then(this.handleResponse).then(response => {
                        if (response.success) {
                            this.setState({ ...response.data });

                            this.interval = setInterval(() => {
                                const date = this.calculateCountdown(this.state.time);
                                date ? this.setState(date) : this.stop();
                            }, 1000);

                            this.getAnswers();
                        }
                    });
                }
            });
        }
    }

    getAnswers() {
        const requestOptions = {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        };

        setInterval(() => {
            fetch(`http://127.0.0.1:6969/api/professor/disciplines/${this.state.disciplineId}/${this.state.quizId}/answer`, requestOptions).then(this.handleResponse).then(response => {
                if (response.success) {
                    if (response.data) {
                        this.setState({ profResponses: response.data });
                    }
                }
            });
        }, 2000);
    }

    getAnswersStud() {
        const requestOptions = {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        };

        setInterval(() => {
            fetch(`http://127.0.0.1:6969/api/students/disciplines/${this.state.disciplineId}/${this.state.quizId}/answer?userId=${this.state.user.id}`, requestOptions).then(this.handleResponse).then(response => {
                if (response.success) {
                    if (response.data) {
                        this.setState({ submitted: true, responses: response.data.responses });
                    }
                }
            });
        }, 2000);
    }

    componentWillUnmount() {
        this.stop();
    }

    calculateCountdown(endDate) {
        let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

        // clear countdown when date is reached
        if (diff <= 0) {
            this.setState({ submitted: true });

            return false;
        }

        const timeLeft = {
            min: 0,
            sec: 0
        };

        // calculate time difference between now and expected date
        if (diff >= 60) {
            timeLeft.min = Math.floor(diff / 60);
            diff -= timeLeft.min * 60;
        }

        timeLeft.sec = diff;

        return timeLeft;
    }

    stop() {
        clearInterval(this.interval);
    }

    addLeadingZeros(value) {
        value = String(value);

        while (value.length < 2) {
            value = '0' + value;
        }

        return value;
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

    submitAnswer() {
        let responses = [];

        const c = document.getElementsByClassName('answer');

        for (let index = 0; index < c.length; index++) {
            const e = c[index];

            if (e.value) {
                responses.push({
                    value: e.value,
                    status: '',
                    index
                });
            }
        }

        let data = {
            userId: this.state.user.id,
            quizId: this.state.quizId,
            responses
        };

        const requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        if (new Date(this.state.time).valueOf() > new Date().valueOf()) {
            fetch(`http://127.0.0.1:6969/api/professor/disciplines/${this.state.disciplineId}/${this.state.quizId}`, requestOptions).then(this.handleResponse).then(response => {
                if (response.success) {
                    this.setState({ submitted: true, responses, responses });
                }
            });
        } else {
        }
    }

    sendStatus(e, index, type) {
        const item = e;

        item.responses[index].status = type === 1 ? 'right' : 'wrong';

        const items = this.state.profResponses;

        items.forEach(e => {
            if (e._id === item._id) {
                e = item;
            }
        });

        const requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        };

        fetch(`http://127.0.0.1:6969/api/professor/disciplines/${this.state.disciplineId}/${this.state.quizId}/answer?status=${type === 1 ? 'right' : 'wrong'}`, requestOptions).then(this.handleResponse).then(response => {
            if (response.success) {
                this.setState({ profResponses: items });
            }
        });
    }

    render() {
        const { user, prof, title, min, sec, questions, submitted, responses, profResponses } = this.state;

        return (
            <React.Fragment>
                <Navbar logged={true} prof={prof} history={this.props.history} user={user} />
                <link rel="stylesheet" href="/src/HomePage/main.css" />
                {!prof ? (
                    <React.Fragment>
                        <div className="container mt-4">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-sm-6"><h1 className="curs-title">{title}</h1></div>
                                    <div className="col-sm-6 text-right"><h1>Time left {this.addLeadingZeros(min)}:{this.addLeadingZeros(sec)}</h1></div>
                                </div>
                                <hr />
                                <h3>Questions</h3>
                                <hr />
                                {questions && questions.map((e, key) => (
                                    <React.Fragment key={key}>
                                        <h3>{key + 1}. {e}</h3>
                                        {!submitted ? (
                                            <div className="form-group">
                                                <textarea placeholder="Answer.." className="form-control answer" rows="3"></textarea>
                                            </div>
                                        ) : (
                                                responses && responses.map((e, key2) => (
                                                    responses[key2] && responses[key2].index === key ? (
                                                        <h4 key={key2} className={responses[key2].status === 'wrong' ? 'wrong-answer' : responses[key2].status === 'right' ? 'right-answer' : ''}>{responses[key2].value}</h4>
                                                    ) : ''
                                                ))
                                            )}
                                    </React.Fragment>
                                ))}
                                {!submitted ? (
                                    <button className="btn btn-primary" onClick={() => this.submitAnswer()}>Submit your answers</button>
                                ) : (
                                        <h4 className="mt-3">You submit you answers, wait for response!</h4>
                                    )}
                            </div>
                        </div>
                    </React.Fragment>
                ) : (
                        <React.Fragment>
                            <div className="container mt-4">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-sm-6"><h1 className="curs-title">{title}</h1></div>
                                        <div className="col-sm-6 text-right"><h1>Time left {this.addLeadingZeros(min)}:{this.addLeadingZeros(sec)}</h1></div>
                                    </div>
                                    <hr />
                                    <h3>Questions</h3>
                                    {questions && questions.map((e, key) => (
                                        <h3 key={key}>{key + 1}. {e}</h3>
                                    ))}
                                    <hr />
                                    <h3>Responses</h3>
                                    {profResponses && profResponses.map((e, key) => (
                                        <React.Fragment key={key}>
                                            <div className="card mb-2">
                                                <div className="card-body">
                                                    {e.responses && e.responses.map((e2, key2) => (
                                                        <React.Fragment key={key2}>
                                                            <div className="col-md-12 mb-2 mt-2">
                                                                <div className="row">
                                                                    <div className="col-md-10">
                                                                        <h4>{e2.index + 1}. {e2.value}</h4>
                                                                    </div>
                                                                    <div className="col-md-2">
                                                                        <div className="row">
                                                                            {!e2.status ? (
                                                                                <React.Fragment>
                                                                                    <button className="btn btn-success float-right btn-xs mr-2" onClick={() => this.sendStatus(e, key2, 1)}>right</button>
                                                                                    <button className="btn btn-danger float-right btn-xs" onClick={() => this.sendStatus(e, key2, 2)}>wrong</button>
                                                                                </React.Fragment>
                                                                            ) : e2.status === 'right' ? (
                                                                                <button className="btn btn-success float-right btn-xs mr-2">right</button>
                                                                            ) : (
                                                                                        <button className="btn btn-danger float-right btn-xs">wrong</button>
                                                                                    )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </React.Fragment>
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

const connectedQuizPage = connect(mapStateToProps)(QuizPage);
export { connectedQuizPage as QuizPage };