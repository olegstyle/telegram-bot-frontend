import React from "react";

export default (props) => (
    <div>
        <div>
            <div className="sidebar">
                <div className="sidebar-inner">
                    <div className="sidebar-logo">
                        <div className="peers ai-c fxw-nw">
                            <div className="peer peer-greed">
                                <a className="sidebar-link td-n" href="/dashboard">
                                    <div className="peers ai-c fxw-nw">
                                        <div className="peer">
                                            <div className="logo">
                                                <img src="/static/images/logo.png" alt="" />
                                            </div>
                                        </div>
                                        <div className="peer peer-greed">
                                            <h5 className="lh-1 mB-0 logo-text">Telegram bots</h5>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="peer">
                                <div className="mobile-toggle sidebar-toggle">
                                    <a href="" className="td-n">
                                        <i className="ti-arrow-circle-left"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ul className="sidebar-menu scrollable pos-r">
                        <li className="nav-item mT-30 active">
                            <a className="sidebar-link" href="/dashboard">
                                <span className="icon-holder">
                                  <i className="c-blue-500 fa fa-home"/>
                                </span>
                                <span className="title">Home</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="sidebar-link" href="#">
                                <span className="icon-holder">
                                  <i className="c-gray-500 fa fa-video-camera"/>
                                </span>
                                <span className="title">Bots</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="sidebar-link" href="#">
                                <span className="icon-holder">
                                  <i className="c-gray-500 fa fa-info"/>
                                </span>
                                <span className="title">Messages</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="sidebar-link" href="#">
                                <span className="icon-holder">
                                  <i className="c-gray-500 fa fa-info"/>
                                </span>
                                <span className="title">Scheduler</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="sidebar-link" href="#">
                                <span className="icon-holder">
                                  <i className="c-gray-500 fa fa-question"/>
                                </span>
                                <span className="title">FAQ</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            &nbsp;
                        </li>

                        <li className="nav-item">
                            <a className="sidebar-link" href="#">
                                <span className="icon-holder">
                                  <i className="c-gray-500 fa fa-user"/>
                                </span>
                                <span className="title">My profile</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
);
