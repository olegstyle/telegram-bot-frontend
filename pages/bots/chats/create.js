import React from "react";
import Router from "next/router";
import DashboardLayout from '../../../components/layouts/dashboard';
import AuthService from "../../../src/services/AuthService";
import { connect } from 'react-redux';
import actions from '../../../redux/actions/auth';
import {handleResponseErrorForComponent} from "../../../src/utils/errorsHandler";
import { Card, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import api from '../../../src/api';

class BotChatCreate extends React.Component {

    static async getInitialProps(context) {
        AuthService.initialShouldAuthorized(context);

        return {query: context.query};
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            bot: {
                id: 0,
                label: '',
            },
            form: {
                label: '',
                chat: ''
            },
            fails: {},
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.loading) {
            return;
        }
        const self = this;
        self.setState({loading: true, fails: {}});
        api.bots.chats.create({...this.state.form, bot: this.state.bot.id})
            .then(response => {
                self.setState({loading: false});
                Router.push('/bots');
            })
            .catch(
            (err) => {
                self.setState({loading: false});
                handleResponseErrorForComponent(err, self);
            }
        );
    }

    handleChange = ({ target }) => {
        let fails = Object.assign({}, this.state.fails);
        delete fails[target.name];
        this.setState({ form: {...this.state.form, [target.name]: target.value}, fails });
    };

    componentDidMount() {
        const botId = this.props.query.botId;
        if (!botId) {
            Router.push('/bots');
            return;
        }

        const self = this;
        api.bots.one(botId)
            .then(response => {
                self.setState({bot: response.data.data});
            })
            .catch(reason => {
                console.error(reason);
                Router.push('/bots');
            });
    }

    render() {
        return <DashboardLayout title="Chat creation">
            <div className="d-flex flex-row align-items-center mb-3">
                <h5 className="mb-0 mr-3">Chat creation for bot: {this.state.bot.label}</h5>
            </div>
            <Card body>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup className={this.state.fails.hasOwnProperty('label') ? 'form-error' : ''}>
                        <Label>Label of chat</Label>
                        <Input
                            name="label"
                            type="text"
                            placeholder="Enter a chat"
                            className={this.state.fails.hasOwnProperty('label') ? 'is-invalid' : ''}
                            value={this.state.form.label}
                            onChange={this.handleChange}
                            disabled={this.state.loading}
                            required
                            autoFocus />
                        <div className="invalid-feedback">
                            {this.state.fails.label}
                        </div>
                        <FormText className="text-muted">
                            Label for identify a chat
                        </FormText>
                    </FormGroup>

                    <FormGroup>
                        <Label>Chat id</Label>
                        <Input
                            name="chat"
                            type="text"
                            placeholder="Enter a chat id"
                            value={this.state.form.chat}
                            className={this.state.fails.hasOwnProperty('chat') ? 'is-invalid' : ''}
                            onChange={this.handleChange}
                            disabled={this.state.loading}
                            required />
                        <div className="invalid-feedback">
                            {this.state.fails.chat}
                        </div>
                        <FormText className="text-muted">
                            A chat id from telegram
                        </FormText>
                    </FormGroup>
                    <button className="btn btn-success" type="submit">Add</button>
                </Form>
            </Card>
        </DashboardLayout>
    }
}

export default connect(
    state => state,
    actions
)(BotChatCreate);
