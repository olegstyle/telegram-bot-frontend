import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import actions from '../../redux/actions/auth';
import AuthLayout from '../../components/layouts/auth';
import AuthService from '../../src/services/AuthService';
import {handleResponseErrorForComponent} from '../../src/utils/errorsHandler';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email: '',
            password: '',
            fails: {},
        };
    }

    static async getInitialProps(context) {
        AuthService.initialShouldNotAuthorized(context);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.loading) {
            return;
        }
        this.setState({fails: {}});
        const self = this;
        self.setState({loading: true});
        this.props.login(
            { email: this.state.email, password: this.state.password },
            () => {
                self.setState({loading: false});
            },
            (err) => {
                self.setState({loading: false});
                handleResponseErrorForComponent(err, self);
            }
        );
    }

    render() {
        return <AuthLayout title="Sign in">
            <section className="sign-in">
                <div className="container">
                    <div className="signin-content">
                        <div className="signin-image">
                            <figure><img src="/static/auth/signin-image.jpg" alt="sing up image" /></figure>
                            <Link href="/auth/register">
                                <a href="/auth/register" className="signup-image-link">Create an account</a>
                            </Link>
                        </div>

                        <div className="signin-form">
                            <h2 className="form-title">Sign in</h2>
                            <form className="register-form" id="login-form" onSubmit={this.handleSubmit.bind(this)}>
                                <div className={'form-group ' + (this.state.fails.hasOwnProperty('email') ? 'form-error' : '')}>
                                    <label htmlFor="your_name"><i className="zmdi zmdi-account material-icons-name"/></label>
                                    <input
                                        type="text"
                                        name="your_name"
                                        id="your_name"
                                        placeholder="Your Name"
                                        value={this.state.email}
                                        onChange={e => this.setState({ email: e.target.value })}
                                        disabled={this.state.loading}
                                        required
                                        autoFocus />
                                    <div className="invalid-feedback d-block">{this.state.fails.email}&nbsp;</div>
                                </div>
                                <div className={'form-group ' + (this.state.fails.hasOwnProperty('password') ? 'form-error' : '')}>
                                    <label htmlFor="your_pass"><i className="zmdi zmdi-lock"/></label>
                                    <input
                                        type="password"
                                        name="your_pass"
                                        id="your_pass"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={e => this.setState({ password: e.target.value })}
                                        disabled={this.state.loading}
                                        required />
                                    <div className="invalid-feedback d-block">{this.state.fails.password}&nbsp;</div>
                                </div>
                                <div className="form-group form-button">
                                    <input
                                        type="submit"
                                        name="signin"
                                        id="signin"
                                        className="form-submit"
                                        value="Log in"
                                        disabled={this.state.loading} />
                                </div>
                                <div className={'spinner' + (this.state.loading ? ' d-block' : ' d-none')}/>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </AuthLayout>
    }
}

export default connect(
    state => state,
    actions
)(Login);
