import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Navbar } from '../Navbar';

import { userActions } from '../_actions';

class HomePage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <link rel="stylesheet" href="/src/HomePage/main.css" />
                <Navbar logged={false} />

                <div className="container">
                    <img src="/src/HomePage/images/1.svg" alt="1" id="sign1" />
                    <div className="col-lg-5 header-section">
                        <h3>A Modern Manager</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae voluptatum architecto enim earum
                            neque. Quis quos officia, repellat facere et hic dicta vitae, voluptatem qui libero, labore eos enim
                itaque.</p>
                        <div className="btn btn-danger" id="startBtn">
                            Start
            </div>
                        <div className="btn btn-danger" id="learnBtn">
                            Learn more
            </div>
                    </div>
                </div>

                <div className="container-fluid" style={{ overflowX: "hidden" }}>
                    <div className="col-lg-9 offset-lg-1 header-image">
                        <img src="/src/HomePage/images/2.svg" alt="2" id="sign2" />
                        <img src="/src/HomePage/images/3.svg" alt="3" id="sign3" />
                        <img src="/src/HomePage/images/Group 38.png" alt="img" />
                    </div>

                    <div className="col-lg-8 offset-lg-2 header-section2">
                        <img id="sign4" src="/src/HomePage/images/4.svg" alt="4" />
                        <div className="row">
                            <div className="col-md-6 card-sec2">
                                <div className="icon">
                                    <i className="fas fa-code"></i>
                                </div>
                                <h4>Created for Developers</h4>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum suscipit nemo, laborum tenetur
                                    quis facere ad maxime est fugiat laboriosam voluptatibus cumque provident! Possimus
                        voluptatibus animi, voluptatum vel officia accusamus mollitia consequatur quas? Amet, quos?</p>
                            </div>
                            <div className="col-md-6 card-sec2">
                                <div className="icon icon2">
                                    <i className="fab fa-safari"></i>
                                </div>
                                <h4>Multi-Browser Support</h4>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum suscipit nemo, laborum tenetur
                                    quis facere ad maxime est fugiat laboriosam voluptatibus cumque provident! Possimus
                        voluptatibus animi, voluptatum vel officia accusamus mollitia consequatur quas? Amet, quos?</p>
                            </div>
                            <div className="col-md-6 card-sec2">
                                <div className="icon icon3">
                                    <i className="fas fa-pencil-alt"></i>
                                </div>
                                <h4>A Modern UI</h4>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum suscipit nemo, laborum tenetur
                                    quis facere ad maxime est fugiat laboriosam voluptatibus cumque provident! Possimus
                        voluptatibus animi, voluptatum vel officia accusamus mollitia consequatur quas? Amet, quos?</p>
                            </div>
                            <div className="col-md-6 card-sec2">
                                <div className="icon icon4">
                                    <i className="fas fa-gamepad"></i>
                                </div>
                                <h4>Build-in Gamification</h4>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum suscipit nemo, laborum tenetur
                                    quis facere ad maxime est fugiat laboriosam voluptatibus cumque provident! Possimus
                        voluptatibus animi, voluptatum vel officia accusamus mollitia consequatur quas? Amet, quos?</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid section3">
                    <div id="bg3"></div>
                    <div className="col-lg-9 header-image header-image2">
                        <div className="col-12 text-center">
                            <h3 className="header">Go Dark</h3>
                            <p>Explore the web at night.</p>
                        </div>
                        <div className="img-container">
                            <img src="/src/HomePage/images/Group 39.png" alt="img" />
                            <img src="/src/HomePage/images/3.svg" alt="5" id="sign5" />
                            <img src="/src/HomePage/images/1.svg" alt="6" id="sign6" />
                            <img src="/src/HomePage/images/1.svg" alt="7" id="sign7" />
                            <img src="/src/HomePage/images/2.svg" alt="8" id="sign8" />
                        </div>
                    </div>
                </div>

                <div className="container last">
                    <img src="/src/HomePage/images/4.svg" alt="9" id="sign9" />
                    <div className="col-12 header-section">
                        <div className="row">
                            <div className="col-md-5 last-section">
                                <h3>Multi-Browser</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus amet iure velit laboriosam
                        magnam error? Ipsa eum inventore perspiciatis fugiat?</p>
                                <div className="btn btn-danger" id="startBtn2">
                                    Learn more
                    </div>
                            </div>
                            <div className="col-md-7 last-img">
                                <img src="/src/HomePage/images/Group 41.png" alt="img" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <footer id="footerContainer">
                        <div className="row">
                            <div className="col-lg-6 col-md-8">
                                <ul id="rightMenu">
                                    <li><a href="/">Privacy and Terms</a></li>
                                    <li><a href="/">About Browser</a></li>
                                </ul>
                            </div>
                            <div className="col-lg-6 col-md-4">
                                <ul id="leftMenu">
                                    <li>
                                        <a href="/">
                                            <i className="far fa-question-circle"></i> Help
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </footer>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage }; 