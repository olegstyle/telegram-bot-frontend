import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import actions from '../../redux/actions/auth';
import AuthLayout from '../../components/layouts/auth';
import AuthService from '../../src/services/AuthService';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
        };
    }

    static async getInitialProps(context) {
        AuthService.initialShouldNotAuthorized(context);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.register({ name: this.state.name, email: this.state.email, password: this.state.password });
    }

    render() {
        return <AuthLayout title="Register">
            <section className="signup">
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Sign up</h2>
                            <form method="POST" className="register-form" id="register-form" onSubmit={this.handleSubmit.bind(this)}>
                                <div className="form-group">
                                    <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"/></label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Your Name"
                                        onChange={e => this.setState({ name: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email"><i className="zmdi zmdi-email"/></label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Your Email"
                                        onChange={e => this.setState({ email: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pass"><i className="zmdi zmdi-lock"/></label>
                                    <input
                                        type="password"
                                        name="pass"
                                        id="pass"
                                        placeholder="Password"
                                        onChange={e => this.setState({ password: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">  </div>
                                <div className="form-group">
                                    <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                                    <label htmlFor="agree-term" className="label-agree-term">
                                        <span><span/></span>
                                        I agree all statements in &nbsp;
                                        <a href="#" className="term-service">Terms of service</a>
                                    </label>
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="form-submit"
                                           value="Register"/>
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure><img src="/static/auth/signup-image.jpg" alt="sing up image" /></figure>
                            <Link href="/auth/login">
                                <a className="signup-image-link">I am already member</a>
                            </Link>
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
)(Register);
