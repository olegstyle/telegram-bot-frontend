import React from "react";
import Link from 'next/link';
import DashboardLayout from '../../components/layouts/dashboard';
import AuthService from "../../src/services/AuthService";
import { connect } from 'react-redux';
import actions from '../../redux/actions/auth';
import { Table, Badge } from 'reactstrap';
import api from '../../src/api';

class BotsPage extends React.Component {
    static async getInitialProps(context) {
        AuthService.initialShouldAuthorized(context);
    }

    constructor(props) {
        super(props);
        this.state = {
            bots: null,
            loading: false,
        };
    }

    loadBots() {
        if (this.state.loading) {
            return;
        }

        this.setState({loading: true});
        const self = this;
        api.bots.list().then(response => {
            self.setState({bots: response.data.data, loading: false});
        }).catch(reason => {
            console.error(reason);
            self.setState({loading: false});
        });
    }

    componentDidMount() {
        this.loadBots();
    }

    render() {
        const  botsRows = [];
        for (const bot of this.state.bots || []) {
            const chats = [];
            for (const chat of bot.chats || []) {
                chats.push(
                    <Badge key={bot.id + '_' + chat.id} variant="info" className="m-1 badge-info">
                        #{chat.id} {chat.label} &rarr; {chat.chat}
                    </Badge>
                );
            }
            botsRows.push(
                <tr key={bot.id}>
                    <td>{bot.label}</td>
                    <td>{chats}</td>
                    <td>
                        <button className="btn btn-sm btn-warning m-1" data-id={bot.id}>Edit</button>
                        <button className="btn btn-sm btn-success m-1" data-id={bot.id}>Add chat</button>
                    </td>
                </tr>
            );
        }
        if (botsRows.length === 0) {
            botsRows.push(
                <tr key="1">
                    <td colSpan="2">Loading...</td>
                </tr>
            );
        }

        return <DashboardLayout title="Bots">
            <div className="d-flex flex-row align-items-center mb-3">
                <h5 className="mb-0 mr-3">Bots</h5>
                <Link href="/bots/create" >
                    <a href="/bots/create" className="btn btn-sm btn-success">Add new bot</a>
                </Link>
            </div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Label</th>
                    <th>Chats</th>
                    <th width="200px">actions</th>
                </tr>
                </thead>
                <tbody>
                    {botsRows}
                </tbody>
            </Table>
        </DashboardLayout>
    }
}

export default connect(
    state => state,
    actions
)(BotsPage);
