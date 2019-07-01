import React from "react";
import Router from "next/router";
import DashboardLayout from '../../components/layouts/dashboard';
import AuthService from "../../src/services/AuthService";
import { connect } from 'react-redux';
import actions from '../../redux/actions/auth';
import {handleResponseErrorForComponent} from "../../src/utils/errorsHandler";
import { Card, Form, FormGroup, Label, Input, Alert, Button } from 'reactstrap';
import api from '../../src/api';
import {toast} from "react-toastify";
import CronBuilder from "react-cron-builder";
import cronstrue from 'cronstrue';
import {confirmAlert} from "react-confirm-alert";
import ReactSelect from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

class Page extends React.Component {
    static async getInitialProps(context) {
        AuthService.initialShouldAuthorized(context);

        return {query: context.query};
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            loadingPosts: false,
            loadingChats: false,
            scheduleId: props.query.scheduleId || null,
            schedule: null,
            posts: [],
            botChats: [],
            form: {
                title: '',
                expression: '* * * * *',
                actionId: 0,
                botChats: [],
                active: 1,
            },
            fails: {},
        };
        this.handleChange = this.handleChange.bind(this);
    }

    loadSchedule() {
        if (this.state.loading || !this.state.scheduleId) {
            return;
        }

        this.setState({loading: true});
        const self = this;
        api.schedules.one(this.state.scheduleId).then(response => {
            const schedule = response.data.data;
            const botChatIds = [];
            for (const botChat of schedule.botChats) {
                botChatIds.push(botChat.id);
            }
            console.log(botChatIds);
            self.setState({
                schedule,
                loading: false,
                form: {
                    title: schedule.title,
                    expression: schedule.expression,
                    actionId: schedule.action ? schedule.action.id : 0,
                    botChats: botChatIds,
                    // active: schedule.active, // temporary always true
                }
            });
        }).catch(reason => {
            console.error(reason);
            self.setState({loading: false});
        });
    }

    loadPosts() {
        if (this.state.loadingPosts) {
            return;
        }

        this.setState({loadingPosts: true});
        const self = this;
        api.posts.list().then(response => {
            const posts = response.data.data;
            let form = this.state.form;
            if (this.state.schedule && this.state.schedule.action) {
                form = {...form, actionId: this.state.schedule.action.id};
            }
            self.setState({posts, form, loadingPosts: false});
        }).catch(reason => {
            console.error(reason);
            self.setState({loadingPosts: false});
        });
    }

    loadBotChats() {
        if (this.state.loadingBotChats) {
            return;
        }

        this.setState({loadingBotChats: true});
        const self = this;
        api.bots.chats.list().then(response => {
            const botChats = response.data.data;
            self.setState({botChats, loadingBotChats: false});
        }).catch(reason => {
            console.error(reason);
            self.setState({loadingBotChats: false});
        });
    }

    componentDidMount() {
        this.loadSchedule();
        this.loadPosts();
        this.loadBotChats();
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.loading) {
            return;
        }
        const self = this;
        const onSuccess = (response) => {
            self.setState({loading: false});
            toast('🦄 Successfully ' + (self.state.schedule ? 'created' : 'changed') + '!');
            Router.push('/schedules');
        };
        const onError = (err) => {
            self.setState({loading: false});
            handleResponseErrorForComponent(err, self);
        };

        self.setState({loading: true, fails: {}});
        if (this.state.schedule) {
            api.schedules.edit(this.state.schedule.id, this.state.form).then(onSuccess).catch(onError);
        } else {
            api.schedules.create(this.state.form).then(onSuccess).catch(onError);
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

    showExpressionEditor() {
        confirmAlert({
            title: 'Edit schedule plan.',
            customUI: (({onClose}) => {
                return <div className="react-confirm-alert-body react-confirm-alert-body-auto-width">
                    <h3 className="mb-3">Edit schedule plan</h3>
                    <CronBuilder
                        cronExpression={this.state.form.expression}
                        onChange={ (expression) => {this.setState({form: {...this.state.form, expression: expression}}); onClose(); } }
                        showResult={false}
                    />
                    <div className="text-center">
                        <button className="btn btn-danger" type="button" onClick={() => onClose()}>Close</button>
                    </div>
                </div>
            }),
        });
    }

    onBotChatsChange(selectedOptions) {
        let fails = Object.assign({}, this.state.fails);
        delete fails.botChats;
        const botChats = [];
        if (selectedOptions) {
            for (const option of selectedOptions) {
                botChats.push(option.value);
            }
        }

        this.setState({ form: {...this.state.form, botChats}, fails });
    }

    render() {
        const title = (this.state.scheduleId ? 'Change' : 'Create') + ' a schedule';

        const posts = [<option key="0" value="0">Not selected</option>];
        for (const post of this.state.posts) {
            posts.push(
                <option key={post.id} value={post.id}>#{post.id} {post.title}</option>
            );
        }

        const botChatsOptions = [];
        const botChatsDefault = [];
        for (const botChat of this.state.botChats) {
            const option = {value: botChat.id, label: `#${botChat.id} ${botChat.bot.label} → ${botChat.label}`};
            botChatsOptions.push(option);
            if (this.state.form.botChats.includes(botChat.id)) {
                botChatsDefault.push(option);
            }
        }

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
                        <Label>Bot Chats</Label>
                        <ReactSelect
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            value={botChatsDefault}
                            isMulti
                            isLoading={this.state.loadingBotChats}
                            options={botChatsOptions}
                            onChange={this.onBotChatsChange.bind(this)} />
                        <div className={'invalid-feedback ' + (this.state.fails.hasOwnProperty('botChats') ? 'is-invalid' : '')}>
                            {this.state.fails.botChats}
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <Label>Message to show</Label>
                        <Input type="select" name="actionId" onChange={this.handleChange} value={this.state.form.actionId}>
                            {posts}
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label>Plan</Label>
                        <div>
                            <Alert className="d-flex justify-content-between align-items-center">
                                <div>{cronstrue.toString(this.state.form.expression)}</div>
                                <Button type="button" onClick={this.showExpressionEditor.bind(this)}>Change</Button>
                            </Alert>
                        </div>
                        <div className="invalid-feedback">
                            {this.state.fails.expression}
                        </div>
                    </FormGroup>

                    <button className="btn btn-success mr-2" type="submit">{this.state.scheduleId ? 'Update' : 'Create'}</button>
                    <button className="btn btn-danger" type="button" onClick={() => Router.push('/schedules')}>Cancel</button>
                </Form>
            </Card>
        </DashboardLayout>
    }
}

export default connect(
    state => state,
    actions
)(Page);
