import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

class DisciplinePage extends React.Component {
    constructor(props) {
        super(props);

        const { match: { params } } = this.props;

        const user = JSON.parse(localStorage.getItem('user'));

        const items = [
            {
                title: 'Curs1',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium minus tempora eaque!'
            },
            {
                title: 'Lab1',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium minus tempora eaque!',
                quiz: true
            },
            {
                title: 'Curs2',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium minus tempora eaque!',
                quiz: true
            },
            {
                title: 'Lab2',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium minus tempora eaque!'
            }
        ];

        this.state = {
            userId: user.id,
            prof: user.role === 1 ? true : false,
            disciplineId: params.id,
            details: {},
            courses: [],
            labs: [],
            items
        };
    }

    componentDidMount() {
        const requestOptions = {
            method: 'get',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', }
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
                                <div className="row"><h1 className="curs-title">Courses and labs</h1></div>
                            </div>
                            <div className="row">
                                <div className="col-md-6"><h4>Courses</h4></div>
                                <div className="col-md-6"><h4>Labs</h4></div>
                                {items && items.map((e, key) => (
                                    <div className={year === 0 ? semester === 0 ? "col-sm-6 mb-3" : e.semester === semester ? "col-sm-6 mb-3" : "col-sm-6 none" : semester === 0 ? e.year === year ? "col-sm-6 mb-3" : "col-sm-6 none" : e.year === year && e.semester === semester ? "col-sm-6 mb-3" : "col-sm-6 none"} key={e._id}>
                                        <div className="materia1">
                                            <div className="card">
                                                <div className="card-body">
                                                    {e.quiz ? <button className="btn btn-sm btn-primary float-right">Enter quiz</button> : ''}
                                                    <h4 className="card-title">{e.title}</h4>
                                                    <p className="description">{e.description}</p>
                                                    <div className="btn btn-success">Download</div>
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
                                    <div className="row"><h1 className="curs-title">Courses and labs</h1></div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6"><h4>Courses</h4></div>
                                    <div className="col-md-6"><h4>Labs</h4></div>
                                    {items && items.map((e, key) => (
                                        <div className={year === 0 ? semester === 0 ? "col-sm-6 mb-3" : e.semester === semester ? "col-sm-6 mb-3" : "col-sm-6 none" : semester === 0 ? e.year === year ? "col-sm-6 mb-3" : "col-sm-6 none" : e.year === year && e.semester === semester ? "col-sm-6 mb-3" : "col-sm-6 none"} key={e._id}>
                                            <div className="materia1">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <button className="btn btn-sm btn-primary float-right">Create quiz</button>
                                                        <h4 className="card-title">{e.title}</h4>
                                                        <p className="description">{e.description}</p>
                                                        <div className="btn btn-success">Download</div>
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