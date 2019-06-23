import React from "react";
import Router from "next/router";
import DashboardLayout from '../../components/layouts/dashboard';
import AuthService from "../../src/services/AuthService";
import { connect } from 'react-redux';
import actions from '../../redux/actions/auth';
import {handleResponseErrorForComponent} from "../../src/utils/errorsHandler";
import { Card, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import api from '../../src/api';
import {toast} from "react-toastify";

class BotsPage extends React.Component {
    static async getInitialProps(context) {
        AuthService.initialShouldAuthorized(context);

        return {query: context.query};
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            postId: props.query.postId || null,
            post: null,
            form: {
                title: '',
                message: '',
                photo: null,
                active: 1,
            },
            fails: {},
        };
        this.handleChange = this.handleChange.bind(this);
    }

    loadPost() {
        if (this.state.loading || !this.state.postId) {
            return;
        }

        this.setState({loading: true});
        const self = this;
        api.posts.one(this.state.postId).then(response => {
            const post = response.data.data;
            self.setState({
                post: post,
                loading: false,
                form: {
                    title: post.title,
                    message: post.message,
                    // active: post.active, // temporary always true
                }
            });
        }).catch(reason => {
            console.error(reason);
            self.setState({loading: false});
        });
    }

    componentDidMount() {
        this.loadPost();
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.loading) {
            return;
        }
        const self = this;
        const onSuccess = (response) => {
            self.setState({loading: false});
            toast('🦄 Successfully ' + (self.state.post ? 'created' : 'changed') + '!');
            Router.push('/messages');
        };
        const onError = (err) => {
            self.setState({loading: false});
            handleResponseErrorForComponent(err, self);
        };

        self.setState({loading: true, fails: {}});
        if (this.state.post) {
            api.posts.edit(this.state.post.id, this.state.form).then(onSuccess).catch(onError);
        } else {
            api.posts.create(this.state.form).then(onSuccess).catch(onError);
        }
    }

    handleChange ({ target }) {
        let fails = Object.assign({}, this.state.fails);
        delete fails[target.name];
        let value = target.value;
        if (target.type === 'file') {
            value = target.files[0];
        }
        this.setState({ form: {...this.state.form, [target.name]: value}, fails });
    }

    render() {
        const title = (this.state.postId ? 'Change' : 'Create') + ' a message';

        return <DashboardLayout title={title}>
            <div className="d-flex flex-row align-items-center mb-3">
                <h5 className="mb-0 mr-3">{title}</h5>
            </div>
            <Card body>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup className={this.state.fails.hasOwnProperty('title') ? 'form-error' : ''}>
                        <Label>Title</Label>
                        <Input
                            name="title"
                            type="text"
                            placeholder="Enter a title"
                            className={this.state.fails.hasOwnProperty('title') ? 'is-invalid' : ''}
                            value={this.state.form.title}
                            onChange={this.handleChange}
                            disabled={this.state.loading}
                            required
                            autoFocus />
                        <div className="invalid-feedback">
                            {this.state.fails.title}
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <Label>Message</Label>
                        <Input
                            name="message"
                            type="textarea"
                            placeholder="Enter a message"
                            value={this.state.form.message}
                            className={this.state.fails.hasOwnProperty('message') ? 'is-invalid' : ''}
                            onChange={this.handleChange}
                            disabled={this.state.loading}
                            required />
                        <div className="invalid-feedback">
                            {this.state.fails.message}
                        </div>
                        <FormText className="text-muted">
                            <a href="https://wikipedia.org/wiki/Markdown" target="_blank" rel="noopener noreferrer">
                                The Markdown
                            </a>&nbsp;
                            is supported.
                        </FormText>
                    </FormGroup>

                    <FormGroup>
                        <Label>Image</Label>
                        <Input
                            name="photo"
                            type="file"
                            className={this.state.fails.hasOwnProperty('photo') ? 'is-invalid' : ''}
                            onChange={this.handleChange}
                            disabled={this.state.loading} />
                        <div className="invalid-feedback">
                            {this.state.fails.photo}
                        </div>
                        <img className={this.state.post && this.state.post.photoPath ? 'd-block' : 'd-none'}
                             style={{maxWidth: '320px', maxHeight: '200px'}}
                             src={this.state.post ? (this.state.post.photoPath || '') : ''}
                             alt={this.state.post ? this.state.post.title : ''} />
                    </FormGroup>

                    <button className="btn btn-success mr-2" type="submit">{this.state.postId ? 'Update' : 'Create'}</button>
                    <button className="btn btn-danger" type="button" onClick={() => Router.push('/messages')}>Cancel</button>
                </Form>
            </Card>
        </DashboardLayout>
    }
}

export default connect(
    state => state,
    actions
)(BotsPage);
