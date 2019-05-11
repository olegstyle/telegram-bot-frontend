import React from 'react'
import LoadingLayout from '../components/layouts/loading';
import AuthService from '../src/services/AuthService';

// noinspection JSUnusedGlobalSymbols
export default class extends React.Component {
    // noinspection JSUnusedGlobalSymbols
    static async getInitialProps(context) {
        AuthService.initialShouldAuthorized(context);
        AuthService.initialShouldNotAuthorized(context);
    }

    render() {
        return <LoadingLayout title={'Title'}>Loading...</LoadingLayout>
    }
}
