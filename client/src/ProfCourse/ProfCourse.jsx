import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

import './course-lab-prof.css';

class ProfCourse extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="col-md-12">
                        <div className="row">
                            <h1 className="curs-title">Introducere in .net</h1>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="curs1">
                                        <p className="name">Course 1</p>
                                        <button type="button" className="btn btn-primary start-game" data-toggle="modal" data-target="#myModal">Game</button>
                                        <p className="description">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                            Blanditiis, aspernatur illum beatae architecto cum vel velit dignissimos quae voluptate
                                nesciunt perspiciatis nulla error! Quo assumenda fugit suscipit illo rem laboriosam.</p>
                                        <a href="" className="pdf">Download pdf</a>
                                        <a href="" className="details"></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="curs1">
                                        <p className="name">Course 1</p>
                                        <button type="button" className="btn btn-primary start-game" data-toggle="modal" data-target="#myModal">Game</button>
                                        <p className="description">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                            Blanditiis, aspernatur illum beatae architecto cum vel velit dignissimos quae voluptate
                                nesciunt perspiciatis nulla error! Quo assumenda fugit suscipit illo rem laboriosam.</p>
                                        <a href="" className="pdf">Download pdf</a>
                                        <a href="" className="details"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="row">
                            <div className="add-course">
                                <button type="button" className="btn btn-primary add-course" data-toggle="modal" data-target="#myModal2">Add
                        a new course</button>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="myModal" role="dialog">
                        <div className="modal-dialog">

                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Questions</h4>
                                </div>
                                <div className="modal-body">
                                    <textarea rows="4" cols="50" placeholder="Intrebare"></textarea>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary">Submit</button>
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="modal fade" id="myModal2" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Add course</h4>
                                </div>
                                <div className="modal-body">
                                    <div className="form">
                                        <div className="add-title">
                                            <p>Add title course</p>
                                            <input type="text" />
                                        </div>
                                        <div className="add-description">
                                            <p>Add description</p>
                                            <textarea rows="4" cols="50" placeholder="Add description"></textarea>
                                        </div>
                                        <div className="add-pdf">
                                            <input type="file" id="file" accept=".pdf" />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary">Submit</button>
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
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

const connectedProfCourse = connect(mapStateToProps)(ProfCourse);
export { connectedProfCourse as ProfCourse };