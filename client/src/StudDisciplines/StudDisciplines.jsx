import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

class StudDisciplines extends React.Component {
    constructor(props) {
        super(props);
        // const items = [
        //     {
        //         title: '1',
        //         description: 'asdasfdasfasf',
        //         updated: Date.now,
        //         year: 1,
        //         semester: 1,
        //         credit: 5,
        //         subscribers: ['asdasd']
        //     },
        //     {
        //         title: '1',
        //         description: 'asdasfdasfasf',
        //         updated: Date.now,
        //         year: 3,
        //         semester: 1,
        //         credit: 5,
        //         subscribers: ['asdasd']
        //     },
        //     {
        //         title: '1',
        //         description: 'asdasfdasfasf',
        //         updated: Date.now,
        //         year: 2,
        //         semester: 1,
        //         credit: 5,
        //         subscribers: ['asdasdasdasd']
        //     },
        //     {
        //         title: '1',
        //         description: 'asdasfdasfasf',
        //         updated: Date.now,
        //         year: 1,
        //         semester: 2,
        //         credit: 5,
        //         subscribers: ['asdasdasd']
        //     }
        // ];
        this.state = {
            year: 0,
            semester: 0,
            userId: 'asdasd'
        };
    }

    componentDidMount() {
        const requestOptions = {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(`http://127.0.0.1:6969/api/students/disciplines`, requestOptions).then(this.handleResponse).then(items => {
            this.setState({ ...items });
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

    handleChange(e) {
        this.setState({
            [e.target.name]: parseInt(e.target.value)
        });
    }

    render() {
        const { items, year, semester, userId } = this.state;
        return (
            <React.Fragment>
                <link rel="stylesheet" href="/src/StudDisciplines/main.css" />
                <div className="container mt-3">
                    <div className="col-md-12">
                        <h1 className="curs-title">Discipline de studiu</h1>
                        <div className="form-group">
                            <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Selecteaza anul:</button>
                            <select name="year" onChange={this.handleChange.bind(this)}>
                                <option value="0">All</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                            <br />
                            <label>Selecteaza semestrul:</label>
                            <select name="semester" onChange={this.handleChange.bind(this)}>
                                <option value="0">All</option>
                                <option value="1">1</option>
                                <option value="2">2</option>

                            </select>
                        </div>
                    </div>
                    <div className="row">
                        {items && items.map((e, key) => (
                            <div className={year === 0 ? semester === 0 ? "col-sm-6" : e.semester === semester ? "col-sm-6" : "col-sm-6 none" : semester === 0 ? e.year === year ? "col-sm-6" : "col-sm-6 none" : e.year === year && e.semester === semester ? "col-sm-6" : "col-sm-6 none"} key={key}>
                                <div className="materia1">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title">{e.t1itle}</h4>
                                            {e.subscribers.includes(userId) ? <button className="btn btn-danger subscribe">Unsubscribe</button> : <button className="btn btn-success subscribe">Subscribe</button>}
                                            <p className="description">{e.description}</p>
                                            <p className="info"> AN {e.year}; SEMESTRU {e.semester}; Cerdits {e.credit}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
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

const connectedStudDisciplines = connect(mapStateToProps)(StudDisciplines);
export { connectedStudDisciplines as StudDisciplines };