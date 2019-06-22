import React from "react";
import Link from 'next/link';
import DashboardLayout from '../../components/layouts/dashboard';
import AuthService from "../../src/services/AuthService";
import { connect } from 'react-redux';
import actions from '../../redux/actions/auth';
import { Table, Form, Input } from 'reactstrap';
import api from '../../src/api';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';

class PostsPage extends React.Component {
    static async getInitialProps(context) {
        AuthService.initialShouldAuthorized(context);
    }

    constructor(props) {
        super(props);
        this.state = {
            posts: null,
            botChats: null,
            loading: false,
            loadingBotChats: false,
        };
    }

    loadPosts() {
        if (this.state.loading) {
            return;
        }

        this.setState({loading: true});
        const self = this;
        api.posts.list().then(response => {
            self.setState({posts: response.data.data, loading: false});
        }).catch(reason => {
            console.error(reason);
            self.setState({loading: false});
        });
    }

    loadBotChats() {
        if (this.state.loadingBotChats) {
            return;
        }

        this.setState({loadingBotChats: true});
        const self = this;
        api.bots.chats.list().then(response => {
            self.setState({botChats: response.data.data, loadingBotChats: false});
        }).catch(reason => {
            console.error(reason);
            self.setState({loadingBotChats: false});
        });
    }

    deletePost(post, e) {
        const self = this;
        confirmAlert({
            title: 'Confirm delete.',
            message: `Are you sure that you want to delete post with name ${post.title}?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        api.posts.delete(post.id).then(value => {
                            self.loadPosts();
                            toast('🦄 Successfully Deleted!');
                        }).catch(reason => {
                            toast.warn('🦄 Delete failed!');
                            console.error(reason);
                            self.loadPosts();
                        });
                    }
                },
                {
                    label: 'No',
                }
            ]
        });
    }

    sendImmediately(post, e) {
        const self = this;
        if (!self.state.botChats || !self.state.botChats.length) {
            return;
        }
        const botChats = [];
        for (const botChat of self.state.botChats) {
            botChats.push(
                <option key={botChat.id} value={botChat.id}>#{botChat.id} {botChat.bot.label} &rarr; {botChat.label}</option>
            );
        }
        confirmAlert({
            title: 'Confirm immediately send.',
            message: `Select a bot for send the post with name ${post.title}.`,
            customUI: (({onClose}) => {
                return <div className="react-confirm-alert-body"><h3>Confirm immediately send.</h3>
                    Select a bot for send the post with name Post #1.
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        api.posts.immediately(
                            post.id,
                            e.target.getElementsByTagName('select')[0].value
                        ).then(value => {
                            toast('🦄 Successfully sent!');
                        }).catch(reason => {
                            toast.warn('🦄 Send failed!');
                            console.error(reason);
                        });
                        onClose();
                    }}>
                        <Input type="select" name="chat_Id">
                            {botChats}
                        </Input>

                        <div className="react-confirm-alert-button-group">
                            <button type="submit">Send</button>
                            <button type="button" onClick={onClose}>Cancel</button>
                        </div>
                    </Form>
                </div>
            }),
        });
    }

    componentDidMount() {
        this.loadPosts();
        this.loadBotChats();
    }

    render() {
        const  postRows = [];
        for (const post of this.state.posts || []) {
            postRows.push(
                <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>
                        <img className={post && post.photoPath ? 'd-block' : 'd-none'}
                             style={{maxWidth: '200px', maxHeight: '100px'}}
                             src={post ? (post.photoPath || '') : ''}
                             alt={post ? post.title : ''} />
                    </td>
                    <td>
                        <Link href={{ pathname: '/messages/edit', query: { postId: post.id }}}>
                            <button className="btn btn-sm btn-success m-1">
                                Edit
                            </button>
                        </Link>
                        <button className="btn btn-sm btn-danger m-1" onClick={this.deletePost.bind(this, post)}>
                            Delete
                        </button>
                        <br />
                        <button className={'btn btn-sm btn-info m-1' + (!this.state.botChats || !this.state.botChats.length ? ' d-none' : '')}
                                onClick={this.sendImmediately.bind(this, post)}>
                            Send immediately
                        </button>
                    </td>
                </tr>
            );
        }
        if (postRows.length === 0) {
            postRows.push(
                <tr key="1">
                    <td colSpan="3">Nothing to show...</td>
                </tr>
            );
        }

        return <DashboardLayout title="Posts">
            <div className="d-flex flex-row align-items-center mb-3">
                <h5 className="mb-0 mr-3">Posts</h5>
                <Link href="/messages/edit">
                    <a href="/messages/edit" className="btn btn-sm btn-success">Add post</a>
                </Link>
            </div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Title</th>
                    <th width="200px">Image</th>
                    <th width="200px">Actions</th>
                </tr>
                </thead>
                <tbody>
                    {postRows}
                </tbody>
            </Table>
        </DashboardLayout>
    }
}

export default connect(
    state => state,
    actions
)(PostsPage);
