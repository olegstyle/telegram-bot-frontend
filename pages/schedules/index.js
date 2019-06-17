import React from "react";
import DashboardLayout from '../../components/layouts/dashboard';
import AuthService from "../../src/services/AuthService";
import { connect } from 'react-redux';
import actions from '../../redux/actions/auth';

class SchedulerPage extends React.Component {
    static async getInitialProps(context) {
        AuthService.initialShouldAuthorized(context);
    }

    render() {
        return <DashboardLayout title="Scheduler">
            Scheduler...
        </DashboardLayout>
    }
}

export default connect(
    state => state,
    actions
)(SchedulerPage);
