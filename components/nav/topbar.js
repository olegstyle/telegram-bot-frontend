import React from "react";
import { connect } from 'react-redux';
import actions from '../../redux/actions/auth';

class Topbar extends React.Component {
    handleLogout(e) {
        e.preventDefault();
        this.props.logout();
    }

    render(props) {
        return <div className="header navbar">
            <div className="header-container">
                <ul className="nav-left">
                    <li>
                        <a id='sidebar-toggle' className="sidebar-toggle" href="javascript:void(0);">
                            <i className="ti-menu"/>
                        </a>
                    </li>
                </ul>
                <ul className="nav-right">
                    <li className="dropdown">
                        <a href="" className="dropdown-toggle no-after peers fxw-nw ai-c lh-1" data-toggle="dropdown">
                            <div className="peer mR-10">
                                <img className="w-2r bdrs-50p" src="/static/images/no-photo.svg" alt=""/>
                            </div>
                            <div className="peer">
                                <span className="fsz-sm c-grey-900">UserName</span> {/*TODO set user name*/}
                            </div>
                        </a>
                        <ul className="dropdown-menu fsz-sm">
                            <li>
                                <a href="#" className="d-b td-n pY-5 bgcH-grey-100 c-grey-700">
                                    <i className="fa fa-user mR-10"/>
                                    <span>My profile</span>
                                </a>
                            </li>
                            <li role="separator" className="divider"/>
                            <li>
                                <a href="#"
                                   className="d-b td-n pY-5 bgcH-grey-100 c-grey-700"
                                   onClick={this.handleLogout.bind(this)}>
                                    <i className="fa fa-power-off mR-10"/>
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    }
}

export default connect(
    state => state,
    actions
)(Topbar);
