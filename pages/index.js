import React from 'react'
import LoadingLayout from '../components/layouts/loading';
import AuthService from '../services/AuthService';

export default class extends React.Component {
    static async getInitialProps({res}) {
        AuthService.initialShouldAuthorized(res);
        AuthService.initialShouldNotAuthorized(res);

        return {};
    }

    render() {
        return <LoadingLayout title={'Title'}>Loading...</LoadingLayout>
    }
}
