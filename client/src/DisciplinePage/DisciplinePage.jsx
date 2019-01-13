import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

import { Navbar } from '../Navbar';

class DisciplinePage extends React.Component {
    constructor(props) {
        super(props);

        const { match: { params } } = this.props;

        const user = JSON.parse(localStorage.getItem('user'));

        this.state = {
            userId: user.id,
            prof: user.role === 1 ? true : false,
            disciplineId: params.id,
            courses: [],
            labs: [],
            comments: [{
                title: 'asdf'
            }],
            user,
            edit: 0,
            type: 0,
            q: {
                questions: [''],
                time: 0
            }
        };
    }

    componentDidMount() {
        const requestOptions = {
            method: 'get',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', }
        };

        fetch(`http://127.0.0.1:6969/api/professor/disciplines/${this.state.disciplineId}`, requestOptions).then(this.handleResponse).then(data => {
            if (data.success) {
                this.setState({ ...data });
            }
        });
    }

    startEdit(item, type) {
        this.setState({
            edit: item._id,
            type
        });

        document.getElementById('titleEdit').value = item.title;
        document.getElementById('descriptionEdit').value = item.description;
        document.getElementById('pathEdit').value = item.path;
    }

    startQuiz(edit, type) {
        const q = {
            time: 0,
            questions: ['']
        };

        this.setState({
            q,
            edit,
            type
        });
    }

    handleEdit() {
        const data = {
            _id: this.state.edit,
            title: document.getElementById('titleEdit').value,
            description: document.getElementById('descriptionEdit').value,
            path: document.getElementById('pathEdit').value
        };

        const requestOptions = {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch(`http://127.0.0.1:6969/api/professor/disciplines/${this.state.type === 1 ? 'courses' : 'labs'}`, requestOptions).then(this.handleResponse).then(response => {
            if (response.success) {
                if (this.state.type === 1) {
                    let courses = this.state.courses;

                    courses.forEach(item => {
                        if (item._id === this.state.edit) {
                            item.title = document.getElementById('titleEdit').value;
                            item.description = document.getElementById('descriptionEdit').value;
                            item.path = document.getElementById('pathEdit').value;
                        }
                    });

                    this.setState({ courses });
                } else {
                    let labs = this.state.labs;

                    labs.forEach(item => {
                        if (item._id === this.state.edit) {
                            item.title = document.getElementById('titleEdit').value;
                            item.description = document.getElementById('descriptionEdit').value;
                            item.path = document.getElementById('pathEdit').value;
                        }
                    });

                    this.setState({ labs });
                }

                document.getElementById('closeModal').click();
            }
        });
    }

    handleDelete(id, type) {
        const requestOptions = {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(`http://127.0.0.1:6969/api/professor/disciplines/${type === 1 ? 'courses' : 'labs'}/${id}`, requestOptions).then(this.handleResponse).then(response => {
            if (response.success) {
                if (type === 1) {
                    const courses = this.state.courses;

                    courses.forEach((item, index) => {
                        if (item._id === id) {
                            courses.splice(index, 1);
                        }
                    });

                    this.setState({ ...courses });
                } else {
                    const labs = this.state.labs;

                    labs.forEach((item, index) => {
                        if (item._id === id) {
                            labs.splice(index, 1);
                        }
                    });

                    this.setState({ ...labs });
                }
            }
        });
    }

    startAdd(type) {
        this.setState({ type: type === 1 ? 1 : 2 })
    }

    handleAdd() {
        const { type } = this.state;

        const data = {
            title: document.getElementById('titleAdd').value,
            description: document.getElementById('descriptionAdd').value,
            path: document.getElementById('pathAdd').value,
            disciplineId: this.state.disciplineId
        };

        const requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        fetch(`http://127.0.0.1:6969/api/professor/disciplines/${type === 1 ? 'courses' : 'labs'}`, requestOptions).then(this.handleResponse).then(response => {
            if (response.success) {
                if (this.state.type === 1) {
                    const courses = this.state.courses;
                    courses.push(response.data);

                    this.setState({ ...courses });
                } else {
                    const labs = this.state.labs;
                    labs.push(response.data);

                    this.setState({ ...labs });
                }

                document.getElementById('titleAdd').value = '';
                document.getElementById('descriptionAdd').value = '';
                document.getElementById('pathAdd').value = '';

                document.getElementById('closeModal2').click();
            }
        });
    }

    commentAdd() {
        let data = {
            description: document.getElementById('comment').value,
            disciplineId: this.state.disciplineId,
            userId: this.state.userId,
            name: 'Anonim'
        };

        const check = document.getElementById('gdpr');

        if (!check.checked) {
            data.name = `${this.state.user.lastName} ${this.state.user.firstName}`;
        }

        const requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        fetch(`http://127.0.0.1:6969/api/professor/disciplines/${this.state.disciplineId}/comment`, requestOptions).then(this.handleResponse).then(response => {
            if (response.success) {
                const comments = this.state.comments;
                comments.push(response.data);

                this.setState({ ...comments });
            }
        });
    }

    addMoreQuestion() {
        const { q } = this.state;

        q.questions.push('');

        this.setState({ ...q })
    }

    removeMoreQuestion() {
        const { q } = this.state;

        if (q.questions.length > 1) {
            q.questions.pop();

            this.setState({ ...q })
        }
    }

    handleQuestionChange(value, key) {
        const { q } = this.state;

        q.questions[key] = value;

        this.setState({ ...q });
    }

    handleAddQuestion() {
        let data = {
            title: document.getElementById('titleQuiz').value,
            questions: this.state.questions,
            userId: this.state.userId,
            disciplineId: this.state.edit,
            time: document.getElementById('timeQuiz').value,
            pathId: this.state.disciplineId
        };

        const requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        if (data.time && data.title && data.questions[0]) {
            fetch(`http://127.0.0.1:6969/api/professor/disciplines/${this.state.type === 1 ? 'courses' : 'labs'}/quiz`, requestOptions).then(this.handleResponse).then(response => {
                if (response.success) {
                    if (this.state.type === 1) {
                        let courses = this.state.courses;

                        courses.forEach(item => {
                            if (item._id === this.state.edit) {
                                item.game = true;
                                item.gameId = response.id;
                            }
                        });

                        this.setState({ courses });
                    } else {
                        let labs = this.state.labs;

                        labs.forEach(item => {
                            if (item._id === this.state.edit) {
                                item.game = true;
                                item.gameId = response.id;
                            }
                        });

                        this.setState({ labs });
                    }

                    document.getElementById('titleQuiz').value = '';
                    document.getElementById('timeQuiz').value = '';

                    document.getElementById('closeModal3').click();
                }
            });
        }
    }

    enterQuiz(id) {
        window.open(`${window.location.href}/${id}`)
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

    checkQuiz() {
        const requestOptions = {
            method: 'get',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', }
        };

        fetch(`http://127.0.0.1:6969/api/professor/disciplines/${this.state.disciplineId}`, requestOptions).then(this.handleResponse).then(data => {
            if (data.success) {
                this.setState({ ...data });
            }
        });
    }

    render() {
        const { courses, labs, userId, prof, user, comments, q } = this.state;

        if (!prof) {
            setInterval(() => {
                this.checkQuiz();
            }, 5000);
        }
        return (
            <React.Fragment>
                <Navbar logged={true} prof={prof} history={this.props.history} user={user} />
                <link rel="stylesheet" href="/src/DisciplinePage/main.css" />
                {!prof ? (
                    <React.Fragment>
                        <div className="container mt-4">
                            <div className="col-md-12">
                                <div className="row"><h1 className="curs-title">Courses and labs</h1></div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row" id="discCoursesContainer">
                                        {courses && courses.map((e, key) => (
                                            <div className="col-sm-12 mb-3" key={key}>
                                                <div className="materia1">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            {e.game ? <button className="btn btn-sm btn-primary float-right" onClick={() => this.enterQuiz(e.gameId)}>Join quiz</button> : ''}
                                                            <h4 className="card-title">{e.title}</h4>
                                                            <p className="description">{e.description}</p>
                                                            <a href={e.path} target="_blank" download>Download</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row" id="discLabsContainer">
                                        {labs && labs.map((e, key) => (
                                            <div className="col-sm-12 mb-3" key={key}>
                                                <div className="materia1">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            {e.game ? <button className="btn btn-sm btn-primary float-right" onClick={() => this.enterQuiz(e.gameId)}>Join quiz</button> : ''}
                                                            <h4 className="card-title">{e.title}</h4>
                                                            <p className="description">{e.description}</p>
                                                            <a href={e.path} target="_blank" download>Download</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '30px' }} className="row">
                                <div className="col-md-6 offset-md-3">
                                    <div className="form-group">
                                        <label htmlFor="comment">Add comment</label>
                                        <textarea placeholder="Comment.." className="form-control" id="comment" rows="3"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <input id="gdpr" className="mr-2" type="checkbox" />
                                        <label htmlFor="gdpr">Check for anonim post</label>
                                    </div>
                                    <button className="btn btn-primary" onClick={() => this.commentAdd()}>Add comment</button>
                                </div>

                                <div className="col-md-6 offset-md-3 mt-3">
                                    {comments && comments.map((e, key) => (
                                        <div className={e.userId === userId ? "card text-white bg-primary mb-1" : "card mb-1"} key={key}>
                                            <div className="card-body">
                                                <h5 className="card-title">{e.name}</h5>
                                                <p className="card-text">{e.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
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
                                    <div className="col-md-6">
                                        <div className="row" id="discCoursesContainer">
                                            {courses && courses.map((e, key) => (
                                                <div className="col-sm-12 mb-3" key={key}>
                                                    <div className="materia1">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                {e.game ? (
                                                                    <button className="btn btn-sm btn-primary float-right" onClick={() => this.enterQuiz(e.gameId)}>Join quiz</button>
                                                                ) : (
                                                                        <button className="btn btn-sm btn-primary float-right" data-toggle="modal" data-target="#quizModal" onClick={() => this.startQuiz(e._id, 1)}>Create quiz</button>
                                                                    )}
                                                                <button className="btn btn-sm btn-danger float-right mr-1" onClick={() => this.handleDelete(e._id, 1)}>Delete</button>
                                                                <button className="btn btn-sm btn-success float-right mr-1" data-toggle="modal" data-target="#editModal" onClick={() => this.startEdit(e, 1)}>Edit</button>
                                                                <h4 className="card-title">{e.title}</h4>
                                                                <p className="description">{e.description}</p>
                                                                <a href={e.path} target="_blank" download>Download</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div id="addDiscCoursesContainer" className="col-sm-12 text-center">
                                                <button data-toggle="modal" data-target="#addModal" className="btn btn-primary addDisc" onClick={() => this.startAdd(1)}>Add new course</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row" id="discLabsContainer">
                                            {labs && labs.map((e, key) => (
                                                <div className="col-sm-12 mb-3" key={key}>
                                                    <div className="materia1">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                {e.game ? (
                                                                    <button className="btn btn-sm btn-primary float-right" onClick={() => this.enterQuiz(e.gameId)}>Join quiz</button>
                                                                ) : (
                                                                        <button className="btn btn-sm btn-primary float-right" data-toggle="modal" data-target="#quizModal" onClick={() => this.startQuiz(e._id, 2)}>Create quiz</button>
                                                                    )}
                                                                <button className="btn btn-sm btn-danger float-right mr-1" onClick={() => this.handleDelete(e._id, 2)}>Delete</button>
                                                                <button className="btn btn-sm btn-success float-right mr-1" data-toggle="modal" data-target="#editModal" onClick={() => this.startEdit(e, 2)}>Edit</button>
                                                                <h4 className="card-title">{e.title}</h4>
                                                                <p className="description">{e.description}</p>
                                                                <a href={e.path} target="_blank" download>Download</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div id="addDiscLabsContainer" className="col-sm-12 text-center">
                                                <button data-toggle="modal" data-target="#addModal" className="btn btn-primary addDisc" onClick={() => this.startAdd(2)}>Add new lab</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: '30px' }} className="row">
                                    <div className="col-md-6 offset-md-3">
                                        <div className="form-group">
                                            <label htmlFor="comment">Add comment</label>
                                            <textarea placeholder="Comment.." className="form-control" id="comment" rows="3"></textarea>
                                        </div>
                                        <div className="form-group">
                                            <input id="gdpr" className="mr-2" type="checkbox" />
                                            <label htmlFor="gdpr">Check for anonim post</label>
                                        </div>
                                        <button className="btn btn-primary" onClick={() => this.commentAdd()}>Add comment</button>
                                    </div>

                                    <div className="col-md-6 offset-md-3 mt-3">
                                        {comments && comments.map((e, key) => (
                                            <div className={e.userId === userId ? "card text-white bg-primary mb-1" : "card mb-1"} key={key}>
                                                <div className="card-body">
                                                    <h5 className="card-title">{e.name}</h5>
                                                    <p className="card-text">{e.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLongTitle">Edit course or lab</h5>
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
                                            <div className="form-group">
                                                <label htmlFor="pathEdit">Link</label>
                                                <textarea placeholder="Link.." className="form-control" id="pathEdit" rows="1"></textarea>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button id="closeModal" type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary" onClick={() => this.handleEdit()}>Save changes</button>
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
                                            <div className="form-group">
                                                <label htmlFor="pathAdd">Link</label>
                                                <textarea placeholder="Link.." className="form-control" id="pathAdd" rows="1"></textarea>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button id="closeModal2" type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary" onClick={() => this.handleAdd()}>Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal fade" id="quizModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLongTitle">Create quiz</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <input type="hidden" id="discId" />
                                            <div className="form-group">
                                                <label htmlFor="titleQuiz">Title</label>
                                                <textarea placeholder="Title.." className="form-control" id="titleQuiz" rows="1"></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="timeQuiz">Minutes for answer</label>
                                                <input type="number" className="form-control" id="timeQuiz" placeholder="Minutes.." />
                                            </div>
                                            {q.questions && q.questions.map((e, key) => (
                                                <div className="form-group" key={key}>
                                                    <label htmlFor="descriptionAdd">Question {key + 1}</label>
                                                    <textarea placeholder="Question.." className="form-control questionAdd" rows="3" value={e} onChange={(e) => this.handleQuestionChange(e.target.value, key)}></textarea>
                                                </div>
                                            ))}
                                            <button type="button" className="btn btn-primary mr-2" onClick={() => this.addMoreQuestion()}>Add question</button>
                                            <button type="button" className="btn btn-danger" onClick={() => this.removeMoreQuestion()}>Remove last question</button>
                                        </div>
                                        <div className="modal-footer">
                                            <button id="closeModal3" type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary" onClick={() => this.handleAddQuestion()}>Save changes</button>
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

const connectedDisciplinePage = connect(mapStateToProps)(DisciplinePage);
export { connectedDisciplinePage as DisciplinePage };