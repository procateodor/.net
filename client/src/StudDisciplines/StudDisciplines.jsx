import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

import moment from 'moment';

import { Navbar } from '../Navbar';

class StudDisciplines extends React.Component {
    constructor(props) {
        super(props);

        const user = JSON.parse(localStorage.getItem('user'));

        this.state = {
            year: 0,
            semester: 0,
            userId: user.id,
            prof: user.role === 1 ? true : false,
            user,
            edit: 0,
            items: []
        };
    }

    componentDidMount() {
        if (this.state.prof) {
            const requestOptions = {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            };

            fetch(`http://127.0.0.1:6969/api/professor/disciplines?profId=${this.state.userId}`, requestOptions).then(this.handleResponse).then(items => {
                this.setState({ ...items });
            });
        } else {
            const requestOptions = {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            };

            fetch(`http://127.0.0.1:6969/api/students/disciplines`, requestOptions).then(this.handleResponse).then(items => {
                this.setState({ ...items });
            });
        }
    }

    startEdit(item) {
        this.setState({
            edit: item._id
        });

        document.getElementById('titleEdit').value = item.title;
        document.getElementById('descriptionEdit').value = item.description;
        document.getElementById('yearEdit').value = item.year;
        document.getElementById('semesterEdit').value = item.semester;
        document.getElementById('creditEdit').value = item.credit;
    }

    handleDelete(id) {
        const requestOptions = {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(`http://127.0.0.1:6969/api/professor/disciplines/${id}`, requestOptions).then(this.handleResponse).then(response => {
            if (response.success) {
                const items = this.state.items;

                items.forEach((item, index) => {
                    if (item._id === id) {
                        items.splice(index, 1);
                    }
                });

                this.setState({ ...items });
            }
        });
    }

    handleAdd() {
        const data = {
            title: document.getElementById('titleAdd').value,
            description: document.getElementById('descriptionAdd').value,
            year: parseInt(document.getElementById('yearAdd').value),
            semester: parseInt(document.getElementById('semesterAdd').value),
            credit: parseInt(document.getElementById('creditAdd').value),
            profId: this.state.userId
        };

        const requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        fetch(`http://127.0.0.1:6969/api/professor/disciplines`, requestOptions).then(this.handleResponse).then(response => {
            if (response.success) {
                const items = this.state.items;
                items.push(response.data);

                this.setState({ ...items });

                document.getElementById('titleAdd').value = '';
                document.getElementById('descriptionAdd').value = '';
                document.getElementById('yearAdd').value = '';
                document.getElementById('semesterAdd').value = '';
                document.getElementById('creditAdd').value = '';

                document.getElementById('closeModal2').click();
            }
        });
    }

    downloadReport(course_id) {
        const data = {
            course_id
        };

        const requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        fetch(`http://127.0.0.1:6969/api/professor/studsReport`, requestOptions).then(this.handleResponse).then(response => {
            if (response.success) {
                const requestOptions2 = {
                    method: 'get',
                    headers: { 'Content-Type': 'text/plain' }
                };

                fetch(`http://127.0.0.1:6969${response.path}`, requestOptions2).then(response => response.text()).then(response => require('react-file-download')(response, 'raport.txt'));
            }
        });
    }

    handleEdit() {
        const data = {
            _id: this.state.edit,
            title: document.getElementById('titleEdit').value,
            description: document.getElementById('descriptionEdit').value,
            year: parseInt(document.getElementById('yearEdit').value),
            semester: parseInt(document.getElementById('semesterEdit').value),
            credit: parseInt(document.getElementById('creditEdit').value),
        };

        const requestOptions = {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        fetch(`http://127.0.0.1:6969/api/professor/disciplines`, requestOptions).then(this.handleResponse).then(response => {
            if (response.success) {
                let items = this.state.items;

                items.forEach(item => {
                    if (item._id === this.state.edit) {
                        item.title = document.getElementById('titleEdit').value;
                        item.description = document.getElementById('descriptionEdit').value;
                        item.year = document.getElementById('yearEdit').value;
                        item.semester = document.getElementById('semesterEdit').value;
                        item.credit = document.getElementById('creditEdit').value;
                    }
                });

                this.setState({ items });

                document.getElementById('closeModal').click();
            }
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
        const { items, year, semester, userId, prof, user } = this.state;
        return (
            <React.Fragment>
                <Navbar logged={true} prof={prof} history={this.props.history} user={user} />
                <link rel="stylesheet" href="/src/StudDisciplines/main.css" />

                <img className="sign2" src="/src/HomePage/images/1.svg" alt="2" id="sign2" />
                <img className="sign3" src="/src/HomePage/images/3.svg" alt="3" id="sign3" />
                <img className="sign4" src="/src/HomePage/images/2.svg" alt="3" id="sign7" />

                {!prof ? (
                    <React.Fragment>
                        <div className="container mt-4">
                            <div className="col-md-12">
                                <div className="row"><h1 className="curs-title">Disciplines</h1></div>
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
                                    <div className={year === 0 ? semester === 0 ? "col-sm-6 mb-3" : e.semester === semester ? "col-sm-6 mb-3" : "col-sm-6 none" : semester === 0 ? e.year === year ? "col-sm-6 mb-3" : "col-sm-6 none" : e.year === year && e.semester === semester ? "col-sm-6 mb-3" : "col-sm-6 none"} key={key}>
                                        <div className="materia1">
                                            <div className="card">
                                                <div className="card-body">
                                                    {e.subscribers.includes(userId) ? (
                                                        <div className="delete-btn unsub-btn" onClick={event => this.updateSubscribe(event, e._id, false)}>
                                                            <i className="fas fa-calendar-minus float-right mr-1"></i>
                                                        </div>
                                                    ) : (
                                                            <div className="delete-btn sub-btn"  onClick={event => this.updateSubscribe(event, e._id, true)}>
                                                                <i className="fas fa-calendar-plus float-right mr-1"></i>
                                                            </div>
                                                        )}
                                                    <Link to={`/disciplines/${e._id}`}>
                                                        <h4 className="card-title title">{e.title}</h4>
                                                    </Link>
                                                    <p className="description">{e.description}</p>
                                                    <div className="row">
                                                        <div className="col-md-4">Year: {e.year}</div>
                                                        <div style={{ textAlign: 'center' }} className="col-md-4">Semester: {e.semester}</div>
                                                        <div style={{ textAlign: 'right' }} className="col-md-4">Credit: {e.credit}</div>
                                                    </div>
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
                                <div className="row" id="discContainer">
                                    {items && items.map((e, key) => (
                                        <div className={year === 0 ? semester === 0 ? "col-sm-6 mb-3" : e.semester === semester ? "col-sm-6 mb-3" : "col-sm-6 none" : semester === 0 ? e.year === year ? "col-sm-6 mb-3" : "col-sm-6 none" : e.year === year && e.semester === semester ? "col-sm-6 mb-3" : "col-sm-6 none"} key={key} id={e._id}>
                                            <div className="materia1">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="add-btn" style={{ marginTop: -6 }} onClick={() => this.downloadReport(e._id)}>
                                                            <i className="fas fa-file-download"></i>
                                                        </div>
                                                        <div className="delete-btn" onClick={() => this.handleDelete(e._id)}>
                                                            <i className="fas fa-trash float-right mr-1"></i>
                                                        </div>
                                                        <div className="edit-btn" data-toggle="modal" data-target="#editModal" onClick={() => this.startEdit(e)}>
                                                            <i className="far fa-edit float-right mr-1"></i>
                                                        </div>
                                                        <Link to={`/disciplines/${e._id}`}>
                                                            <h4 className="card-title title">{e.title}</h4>
                                                        </Link>
                                                        <p className="description">{e.description}</p>
                                                        <div className="row" style={{ color: '#4D4665' }}>
                                                            <div className="col-4 year">Year: {e.year}</div>
                                                            <div style={{ textAlign: 'center' }} className="col-4 semester">Semester: {e.semester}</div>
                                                            <div style={{ textAlign: 'right' }} className="col-4 credit">Credit: {e.credit}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div id="addDiscContainer" className="col-sm-6 text-center">
                                        <div data-toggle="modal" data-target="#addModal" className="btn btn-primary addDisc">Add new discipline</div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLongTitle">Edit discipline</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <input type="hidden" id="discId" />
                                            <div className="form-group">
                                                <label htmlFor="titleEdit">Title</label>
                                                <textarea placeholder="Title.." className="form-control" id="titleEdit" rows="1"></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="descriptionEdit">Description</label>
                                                <textarea placeholder="Description.." className="form-control" id="descriptionEdit" rows="3"></textarea>
                                            </div>
                                            <div className="row">
                                                <div className="col-4">
                                                    <div className="form-group">
                                                        <label htmlFor="yearEdit">Year</label>
                                                        <input type="number" className="form-control" id="yearEdit" placeholder="Year.." />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="form-group">
                                                        <label htmlFor="semesterEdit">Semester</label>
                                                        <input type="number" className="form-control" id="semesterEdit" placeholder="Semester.." />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="form-group">
                                                        <label htmlFor="creditEdit">Credit</label>
                                                        <input type="number" className="form-control" id="creditEdit" placeholder="Credit.." />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <div id="closeModal" className="btn btn-secondary close-edit-modal" data-dismiss="modal">Close</div>
                                            <div className="btn btn-primary save-edit-modal" onClick={() => this.handleEdit()}>Save changes</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal fade" id="addModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLongTitle">Add discipline</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <input type="hidden" id="discId" />
                                            <div className="form-group">
                                                <label htmlFor="titleAdd">Title</label>
                                                <textarea placeholder="Title.." className="form-control" id="titleAdd" rows="1"></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="descriptionAdd">Description</label>
                                                <textarea placeholder="Description.." className="form-control" id="descriptionAdd" rows="3"></textarea>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="yearAdd">Year</label>
                                                        <input type="number" className="form-control" id="yearAdd" placeholder="Year.." />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="semesterAdd">Semester</label>
                                                        <input type="number" className="form-control" id="semesterAdd" placeholder="Semester.." />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="creditAdd">Credit</label>
                                                        <input type="number" className="form-control" id="creditAdd" placeholder="Credit.." />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <div id="closeModal2" className="btn btn-secondary close-edit-modal" data-dismiss="modal">Close</div>
                                            <div className="btn btn-primary save-edit-modal" onClick={() => this.handleAdd()}>Save changes</div>
                                        </div>
                                    </div>
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

const connectedStudDisciplines = connect(mapStateToProps)(StudDisciplines);
export { connectedStudDisciplines as StudDisciplines };