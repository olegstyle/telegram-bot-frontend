import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import actions from '../../redux/actions/auth';
import AuthLayout from '../../components/layouts/auth';
import AuthService from '../../src/services/AuthService';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    static async getInitialProps(context) {
        AuthService.initialShouldNotAuthorized(context);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.login({ email: this.state.email, password: this.state.password });
    }

    render() {
        return <AuthLayout title="Sign in">
            <section className="sign-in">
                <div className="container">
                    <div className="signin-content">
                        <div className="signin-image">
                            <figure><img src="/static/auth/signin-image.jpg" alt="sing up image" /></figure>
                            <Link href="/auth/register">
                                <a href="#" className="signup-image-link">Create an account</a>
                            </Link>
                        </div>

                        <div className="signin-form">
                            <h2 className="form-title">Sign in</h2>
                            <form className="register-form" id="login-form" onSubmit={this.handleSubmit.bind(this)}>
                                <div className="form-group">
                                    <label htmlFor="your_name"><i className="zmdi zmdi-account material-icons-name"/></label>
                                    <input
                                        type="text"
                                        name="your_name"
                                        id="your_name"
                                        placeholder="Your Name"
                                        onChange={e => this.setState({ email: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="your_pass"><i className="zmdi zmdi-lock"/></label>
                                    <input
                                        type="password"
                                        name="your_pass"
                                        id="your_pass"
                                        placeholder="Password"
                                        onChange={e => this.setState({ password: e.target.value })} />
                                </div>
                                <div className="form-group form-button">
                                    <input
                                        type="submit"
                                        name="signin"
                                        id="signin"
                                        className="form-submit"
                                        value="Log in" />
                                </div>
                            </form>
                            <div className="social-login">
                                <span className="social-label">Or login with</span>
                                <ul className="socials">
                                    <li><a href="#"><i className="display-flex-center zmdi zmdi-facebook"/></a></li>
                                    <li><a href="#"><i className="display-flex-center zmdi zmdi-twitter"/></a></li>
                                    <li><a href="#"><i className="display-flex-center zmdi zmdi-google"/></a></li>
                                </ul>
                            </div>
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
