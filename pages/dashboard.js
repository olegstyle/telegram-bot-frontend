import React from "react";
import DashboardLayout from '../components/layouts/dashboard';
import AuthService from "../services/AuthService";

export default class extends React.Component {
    static async getInitialProps({ res }) {
        AuthService.initialShouldAuthorized(res);

        return {};
    }

    render() {
        return <DashboardLayout title={'Title'}>Dashboard...</DashboardLayout>
    }
}
