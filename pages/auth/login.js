import React from 'react';
import Link from 'next/link';
import AuthLayout from '../../components/layouts/auth';
import AuthService from '../../services/AuthService';
import {Button, Card, CardBody, CardText, CardTitle, Col, Row} from 'reactstrap';

export default class extends React.Component {
    static async getInitialProps({ res }) {
        AuthService.initialShouldNotAuthorized(res);
        return {};
    }

    render() {
        return <AuthLayout title={'Title'}>
            <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <Card>
                        <CardBody>
                            <CardTitle>Register</CardTitle>
                            <CardText>Put here form.</CardText>
                            <Link href="/auth/register">
                                <Button color="primary">Register</Button>
                            </Link>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </AuthLayout>
    }
}
