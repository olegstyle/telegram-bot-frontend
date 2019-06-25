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
import cronstrue from 'cronstrue';

class SchedulesPage extends React.Component {
    static async getInitialProps(context) {
        AuthService.initialShouldAuthorized(context);
    }

    constructor(props) {
        super(props);
        this.state = {
            schedules: null,
            loading: false,
        };
    }

    loadSchedules() {
        if (this.state.loading) {
            return;
        }

        this.setState({loading: true});
        const self = this;
        api.schedules.list().then(response => {
            self.setState({schedules: response.data.data, loading: false});
        }).catch(reason => {
            console.error(reason);
            self.setState({loading: false});
        });
    }

    deleteSchedule(schedule, e) {
        const self = this;
        confirmAlert({
            title: 'Confirm delete.',
            message: `Are you sure that you want to delete schedule with name ${schedule.title}?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        api.schedules.delete(schedule.id).then(value => {
                            self.loadSchedules();
                            toast('🦄 Successfully Deleted!');
                        }).catch(reason => {
                            toast.warn('🦄 Delete failed!');
                            console.error(reason);
                            self.loadSchedules();
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
        this.loadSchedules();
    }

    render() {
        const scheduleRows = [];
        for (const schedule of (this.state.schedules || [])) {
            scheduleRows.push(
                <tr key={schedule.id}>
                    <td>{schedule.title}</td>
                    <td>{cronstrue.toString(schedule.expression)}</td>
                    <td>
                        <Link href={{ pathname: '/schedules/edit', query: { scheduleId: schedule.id }}}>
                            <button className="btn btn-sm btn-success m-1">
                                Edit
                            </button>
                        </Link>
                        <button className="btn btn-sm btn-danger m-1" onClick={this.deleteSchedule.bind(this, schedule)}>
                            Delete
                        </button>
                    </td>
                </tr>
            );
        }
        if (scheduleRows.length === 0) {
            scheduleRows.push(
                <tr key="1">
                    <td colSpan="3">Nothing to show...</td>
                </tr>
            );
        }

        return <DashboardLayout title="Schedules">
            <div className="d-flex flex-row align-items-center mb-3">
                <h5 className="mb-0 mr-3">Schedules</h5>
                <Link href="/schedules/edit">
                    <a href="/schedules/edit" className="btn btn-sm btn-success">Add schedule</a>
                </Link>
            </div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Title</th>
                    <th width="300px">Plan</th>
                    <th width="200px">Actions</th>
                </tr>
                </thead>
                <tbody>
                {scheduleRows}
                </tbody>
            </Table>
        </DashboardLayout>
    }
}

export default connect(
    state => state,
    actions
)(SchedulesPage);
