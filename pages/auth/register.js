import React from 'react';
import Link from 'next/link';
import AuthLayout from '../../components/layouts/auth';
import AuthService from '../../services/AuthService';
import {Button} from 'reactstrap';

export default class extends React.Component {
    static async getInitialProps({res}) {
        AuthService.initialShouldNotAuthorized(res);
        return {};
    }

    render() {
        return <AuthLayout title={'Register'}>
            <Link href="/auth/login">
                <Button color="primary">Login</Button>
            </Link>
        </AuthLayout>
    }
}
