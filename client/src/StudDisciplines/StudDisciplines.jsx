import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class StudDisciplines extends React.Component {
    componentDidMount() {

    }

    render() {
        return (
            <React.Fragment>
                <link rel="stylesheet" href="/src/StudDisciplines/main.css" />
                <div className="container">
                    <div className="col-md-12">
                        <h1 className="curs-title">Discipline de studiu</h1>
                        <div className="form-group">
                            <label>Selecteaza anul:</label>
                            <select name="cars">
                                <option value="anul1">1</option>
                                <option value="anul2">2</option>
                                <option value="anul3">3</option>
                            </select>
                            <br />
                            <label>Selecteaza semestrul:</label>
                            <select name="semestru">
                                <option value="semestru1">1</option>
                                <option value="semestru2">2</option>

                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="materia1">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Introducere in programare</h4>
                                        <button className="btn btn-primary subscribe">Subscribe</button>
                                        <p className="description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, aspernatur illum beatae
                                            architecto cum vel velit dignissimos quae voluptate nesciunt perspiciatis nulla error! Quo
                                assumenda fugit suscipit illo rem laboriosam.</p>
                                        <p className="info"> AN 1; SEMESTRU 1 </p>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="materia2">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Logica pentru informatica</h4>
                                        <button className="btn btn-primary subscribe">Subscribe</button>
                                        <p className="description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, aspernatur illum beatae
                                            architecto cum vel velit dignissimos quae voluptate nesciunt perspiciatis nulla error! Quo
                                assumenda fugit suscipit illo rem laboriosam.</p>
                                        <p className="info"> AN 1; SEMESTRU 1 </p>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="materia3">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Matematica</h4>
                                        <button className="btn btn-primary subscribe">Subscribe</button>
                                        <p className="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis quidem iure explicabo vitae expedita
                                            vero quo, asperiores necessitatibus blanditiis excepturi nam dicta dolorum aperiam consequuntur,
                                reprehenderit voluptatibus suscipit repellendus reiciendis!</p>
                                        <p className="info"> AN 1; SEMESTRU 1 </p>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="materia4">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Structuri de date</h4>
                                        <button className="btn btn-primary subscribe">Subscribe</button>
                                        <p className="description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit excepturi rem optio quaerat
                                            ad laborum corrupti ipsum veritatis odit beatae nam, eum earum sequi cumque error hic amet
                                            incidunt non?
                            </p>
                                        <p className="info"> AN 1; SEMESTRU 1 </p>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="materia5">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Inteligenta artificiala</h4>
                                        <button className="btn btn-primary subscribe">Subscribe</button>
                                        <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae nam doloribus fuga perspiciatis
                                            unde, dignissimos deserunt libero minus voluptas eligendi voluptates optio iure aliquid officia
                                            rerum, similique nulla odit sapiente!
                            </p>
                                        <p className="info"> AN 3; SEMESTRU 1 </p>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="materia6">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Limba engleza I</h4>
                                        <button className="btn btn-primary subscribe">Subscribe</button>
                                        <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque eos qui tempora minima reiciendis
                                            sed fugit exercitationem, quo natus beatae pariatur minus consequuntur illo! In non rerum
                                            fuga atque odio!
                            </p>
                                        <p className="info"> AN 1; SEMESTRU 1 </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="materia7">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Programare orientata obiect</h4>
                                        <button className="btn btn-primary subscribe">Subscribe</button>
                                        <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque eos qui tempora minima reiciendis
                                            sed fugit exercitationem, quo natus beatae pariatur minus consequuntur illo! In non rerum
                                            fuga atque odio!
                            </p>
                                        <p className="info"> AN 1; SEMESTRU 2 </p>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="materia8">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Tehnologii Web</h4>
                                        <button className="btn btn-primary subscribe">Subscribe</button>
                                        <p className="description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, aspernatur illum beatae
                                            architecto cum vel velit dignissimos quae voluptate nesciunt perspiciatis nulla error! Quo
                                assumenda fugit suscipit illo rem laboriosam.</p>
                                        <p className="info"> AN 2; SEMESTRU 2 </p>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="materia9">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Retele de calculatoare</h4>
                                        <button className="btn btn-primary subscribe">Subscribe</button>
                                        <p className="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis quidem iure explicabo vitae expedita
                                            vero quo, asperiores necessitatibus blanditiis excepturi nam dicta dolorum aperiam consequuntur,
                                reprehenderit voluptatibus suscipit repellendus reiciendis!</p>
                                        <p className="info"> AN 2; SEMESTRU 1 </p>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="materia10">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Algoritmica grafurilor</h4>
                                        <button className="btn btn-primary subscribe">Subscribe</button>
                                        <p className="description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit excepturi rem optio quaerat
                                            ad laborum corrupti ipsum veritatis odit beatae nam, eum earum sequi cumque error hic amet
                                            incidunt non?
                            </p>
                                        <p className="info"> AN 2; SEMESTRU 1 </p>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="materia11">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Securitatea informatiei</h4>
                                        <button className="btn btn-primary subscribe">Subscribe</button>
                                        <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae nam doloribus fuga perspiciatis
                                            unde, dignissimos deserunt libero minus voluptas eligendi voluptates optio iure aliquid officia
                                rerum, similique nulla odit sapiente!</p>
                                        <p className="info"> AN 3; SEMESTRU 1 </p>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="materia12">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Limba engleza III</h4>
                                        <button className="btn btn-primary subscribe">Subscribe</button>
                                        <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque eos qui tempora minima reiciendis
                                            sed fugit exercitationem, quo natus beatae pariatur minus consequuntur illo! In non rerum
                                fuga atque odio!</p>
                                        <p className="info"> AN 2; SEMESTRU 1 </p>
                                    </div>
                                </div>
                            </div>
                        </div>
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