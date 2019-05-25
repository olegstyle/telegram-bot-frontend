import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import actions from '../../redux/actions/auth';
import AuthLayout from '../../components/layouts/auth';
import AuthService from '../../src/services/AuthService';
import {handleResponseErrorForComponent} from "../../src/utils/errorsHandler";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            name: '',
            email: '',
            password: '',
            agree_term: false,
            fails: {},
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    static async getInitialProps(context) {
        AuthService.initialShouldNotAuthorized(context);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.loading) {
            return;
        }
        if (!this.state.agree_term) {
            this.setState({fails: {agree_term: 'fail'}});
            return;
        }
        this.setState({fails: {}});
        const self = this;
        self.setState({loading: true});
        this.props.register(
            { name: this.state.name, email: this.state.email, password: this.state.password },
            () => {
                self.setState({loading: false});
            },
            (err) => {
                self.setState({loading: false});
                handleResponseErrorForComponent(err, self);
            }
        );
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({[name]: value});
    }

    render() {
        console.log(this.state.fails);
        return <AuthLayout title="Register">
            <section className="signup">
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Sign up</h2>
                            <form method="POST" className="register-form" id="register-form" onSubmit={this.handleSubmit.bind(this)}>
                                <div className={'form-group ' + (this.state.fails.hasOwnProperty('name') ? 'form-error' : '')}>
                                    <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"/></label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Your Name"
                                        onChange={this.handleInputChange} />
                                    <div className="invalid-feedback d-block">{this.state.fails.name}&nbsp;</div>
                                </div>
                                <div className={'form-group ' + (this.state.fails.hasOwnProperty('email') ? 'form-error' : '')}>
                                    <label htmlFor="email"><i className="zmdi zmdi-email"/></label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Your Email"
                                        onChange={this.handleInputChange} />
                                    <div className="invalid-feedback d-block">{this.state.fails.email}&nbsp;</div>
                                </div>
                                <div className={'form-group ' + (this.state.fails.hasOwnProperty('password') ? 'form-error' : '')}>
                                    <label htmlFor="pass"><i className="zmdi zmdi-lock"/></label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        onChange={this.handleInputChange} />
                                    <div className="invalid-feedback d-block">{this.state.fails.password}&nbsp;</div>
                                </div>
                                <div className="form-group">  </div>
                                <div className={'form-group ' + (this.state.fails.hasOwnProperty('agree_term') ? 'form-error' : '')}>
                                    <input type="checkbox"
                                           name="agree_term"
                                           id="agree_term"
                                           className="agree_term"
                                           checked={this.state.agree_term}
                                           onChange={this.handleInputChange} />
                                    <label htmlFor="agree_term" className="label-agree-term">
                                        <span><span/></span>
                                        I agree all statements in &nbsp;
                                        <a href="#" className="term-service">Terms of service</a>
                                    </label>
                                    <div className={'invalid-feedback d-block ' + (this.state.fails.hasOwnProperty('agree_term') ? 'visible' : 'invisible')}>
                                        This field required!
                                    </div>
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
