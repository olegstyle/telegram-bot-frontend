import React from "react";
import Link from "next/link";

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
                            <Link href="/dashboard">
                                <a className="sidebar-link" href="/dashboard">
                                    <span className="icon-holder">
                                      <i className="c-blue-500 fa fa-home"/>
                                    </span>
                                    <span className="title">Home</span>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/bots">
                                <a className="sidebar-link" href="#">
                                    <span className="icon-holder">
                                      <i className="c-gray-500 fas fa-robot"/>
                                    </span>
                                    <span className="title">Bots</span>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/messages">
                                <a className="sidebar-link" href="/messages">
                                    <span className="icon-holder">
                                      <i className="c-gray-500 fas fa-newspaper"/>
                                    </span>
                                    <span className="title">Messages</span>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/schedules">
                                <a className="sidebar-link" href="/schedules">
                                    <span className="icon-holder">
                                      <i className="c-gray-500 fas fa-clock"/>
                                    </span>
                                    <span className="title">Schedules</span>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/faq">
                                <a className="sidebar-link" href="/faq">
                                    <span className="icon-holder">
                                      <i className="c-gray-500 fa fa-question"/>
                                    </span>
                                    <span className="title">FAQ</span>
                                </a>
                            </Link>
                        </li>
                        {/*<li className="nav-item">
                            &nbsp;
                        </li>

                        <li className="nav-item">
                            <Link href="/user/profile">
                                <a className="sidebar-link" href="/user/profile">
                                    <span className="icon-holder">
                                      <i className="c-gray-500 fa fa-user"/>
                                    </span>
                                    <span className="title">My profile</span>
                                </a>
                            </Link>
                        </li>*/}
                    </ul>
                </div>
            </div>
        </div>
    </div>
);
