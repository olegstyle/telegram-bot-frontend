import React from "react";
import Link from 'next/link';
import DashboardLayout from '../../components/layouts/dashboard';
import AuthService from "../../src/services/AuthService";
import { connect } from 'react-redux';
import actions from '../../redux/actions/auth';
import { Table, Badge } from 'reactstrap';
import api from '../../src/api';
import { confirmAlert } from 'react-confirm-alert';

class PostsPage extends React.Component {
    static async getInitialProps(context) {
        AuthService.initialShouldAuthorized(context);
    }

    constructor(props) {
        super(props);
        this.state = {
            posts: null,
            loading: false,
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
                        }).catch(reason => {
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

    componentDidMount() {
        this.loadPosts();
    }

    render() {
        const  postRows = [];
        for (const post of this.state.posts || []) {
            postRows.push(
                <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>
                        <Link href={{ pathname: '/post/edit', query: { postId: post.id }}}>
                            <button className="btn btn-sm btn-success m-1">
                                Edit
                            </button>
                        </Link>
                        <button className="btn btn-sm btn-danger m-1" onClick={this.deletePost.bind(this, post)}>
                            Delete
                        </button>
                        <br />
                        <button className="btn btn-sm btn-info m-1">
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
                <Link href="/posts/edit">
                    <a href="/posts/edit" className="btn btn-sm btn-success">Add post</a>
                </Link>
            </div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Title</th>
                    <th width="200px">actions</th>
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
