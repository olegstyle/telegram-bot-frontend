import React from "react";
import DashboardLayout from '../components/layouts/dashboard';
import AuthService from "../src/services/AuthService";
import { connect } from 'react-redux';
import actions from '../redux/actions/auth';

class FAQPage extends React.Component {
    static async getInitialProps(context) {
        AuthService.initialShouldAuthorized(context);
    }

    render() {
        return <DashboardLayout title="FAQ">
            FAQ...
        </DashboardLayout>
    }
}

export default connect(
    state => state,
    actions
)(FAQPage);
