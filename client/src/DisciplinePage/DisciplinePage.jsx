import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

class DisciplinePage extends React.Component {
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
            labs: []
        };
    }

    componentDidMount() {
        const requestOptions = {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(`http://127.0.0.1:6969/api/professor/disciplines/${this.state.disciplineId}`, requestOptions).then(this.handleResponse).then(data => {
            this.setState({ ...data });
        });
    }

    updateSubscribe(e, id, sub) {
        if (sub) {
            const requestOptions = {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: this.state.userId, id })
            };

            fetch(`http://127.0.0.1:6969/api/students/disciplines/sub`, requestOptions).then(this.handleResponse).then(item => {
                let { items } = this.state;

                items.forEach(i => {
                    if (i._id === item._id) {
                        i.subscribers = item.subscribers;
                    }
                });

                this.setState({ ...items });
            });
        } else {
            const requestOptions = {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: this.state.userId, id })
            };

            fetch(`http://127.0.0.1:6969/api/students/disciplines/unsub`, requestOptions).then(this.handleResponse).then(item => {
                let { items } = this.state;

                items.forEach(i => {
                    if (i._id === item._id) {
                        i.subscribers = item.subscribers;
                    }
                });

                this.setState({ ...items });
            });
        }
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

    handleChange(e) {
        this.setState({
            [e.target.name]: parseInt(e.target.value)
        });
    }

    render() {
        const { items, year, semester, userId, prof } = this.state;
        return (
            <React.Fragment>
                <link rel="stylesheet" href="/src/DisciplinePage/main.css" />
                {!prof ? (
                    <React.Fragment>
                        <div className="container mt-4">
                            <div className="col-md-12">
                                <h1 className="curs-title">Discipline de studiu</h1>
                                <div className="form-group">
                                    <div className="row mt-3">
                                        <div className="col-md-2 mb-3">
                                            <label>Select year:</label>
                                            <select name="year" className="form-control" onChange={this.handleChange.bind(this)}>
                                                <option value="0">All years</option>
                                                <option value="1">First year</option>
                                                <option value="2">Second year</option>
                                                <option value="3">Third year</option>
                                            </select>
                                        </div>
                                        <div className="col-md-2 mb-4">
                                            <label>Select semester:</label>
                                            <select name="semester" className="form-control " onChange={this.handleChange.bind(this)}>
                                                <option value="0">All</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {items && items.map((e, key) => (
                                    <div className={year === 0 ? semester === 0 ? "col-sm-6 mb-3" : e.semester === semester ? "col-sm-6 mb-3" : "col-sm-6 none" : semester === 0 ? e.year === year ? "col-sm-6 mb-3" : "col-sm-6 none" : e.year === year && e.semester === semester ? "col-sm-6 mb-3" : "col-sm-6 none"} key={e._id}>
                                        <div className="materia1">
                                            <div className="card">
                                                <div className="card-body">
                                                    {e.subscribers.includes(userId) ? <button className="btn btn-sm btn-danger float-right" onClick={event => this.updateSubscribe(event, e._id, false)}>Unsubscribe</button> : <button className="btn btn-sm btn-success float-right" onClick={event => this.updateSubscribe(event, e._id, true)}>Subscribe</button>}
                                                    <Link to={`/disciplines/${e._id}`}><h4 className="card-title">{e.title}</h4></Link>
                                                    <p className="description">{e.description}</p>
                                                    <p className="info"> Year {e.year} | Semester {e.semester} | Credits {e.credit}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </React.Fragment>
                ) : (
                        <React.Fragment>
                            <div className="container mt-4">
                                <div className="col-md-12">
                                    <div className="row"><h1 className="curs-title">My disciplines</h1></div>
                                    <div className="form-group">
                                        <div className="row mt-3">
                                            <div className="col-md-2 mb-3">
                                                <label>Select year:</label>
                                                <select name="year" className="form-control" onChange={this.handleChange.bind(this)}>
                                                    <option value="0">All years</option>
                                                    <option value="1">First year</option>
                                                    <option value="2">Second year</option>
                                                    <option value="3">Third year</option>
                                                </select>
                                            </div>
                                            <div className="col-md-2 mb-4">
                                                <label>Select semester:</label>
                                                <select name="semester" className="form-control " onChange={this.handleChange.bind(this)}>
                                                    <option value="0">All</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {items && items.map((e, key) => (
                                        <div className={year === 0 ? semester === 0 ? "col-sm-6 mb-3" : e.semester === semester ? "col-sm-6 mb-3" : "col-sm-6 none" : semester === 0 ? e.year === year ? "col-sm-6 mb-3" : "col-sm-6 none" : e.year === year && e.semester === semester ? "col-sm-6 mb-3" : "col-sm-6 none"} key={e._id}>
                                            <div className="materia1">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <Link to={`/disciplines/${e._id}`}><h4 className="card-title">{e.title}</h4></Link>
                                                        <p className="description">{e.description}</p>
                                                        <p className="info"> Year {e.year} | Semester {e.semester} | Credits {e.credit}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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

const connectedDisciplinePage = connect(mapStateToProps)(DisciplinePage);
export { connectedDisciplinePage as DisciplinePage };