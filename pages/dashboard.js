import React from "react";
import DashboardLayout from '../components/layouts/dashboard';
import AuthService from "../src/services/AuthService";
import { connect } from 'react-redux';
import actions from '../redux/actions/auth';

class Dashboard extends React.Component {
    static async getInitialProps({ res }) {
        AuthService.initialShouldAuthorized(res);
    }

    handleLogout(e) {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        return <DashboardLayout title={'Dashboard'}>
            Dashboard...
            <div><button onClick={this.handleLogout.bind(this)}>Logout</button></div>
        </DashboardLayout>
    }
}

export default connect(
    state => state,
    actions
)(Dashboard);
