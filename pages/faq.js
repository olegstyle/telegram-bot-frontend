import React from "react";
import DashboardLayout from '../components/layouts/dashboard';
import AuthService from "../src/services/AuthService";
import { connect } from 'react-redux';
import actions from '../redux/actions/auth';

class FAQPage extends React.Component {
    static async getInitialProps(context) {
        AuthService.initialShouldAuthorized(context);
    }

    render() {
        return <DashboardLayout title="FAQ">
            <div className="d-flex flex-row align-items-center mb-3">
                <h5 className="mb-0 mr-3">FAQ</h5>
            </div>

            {/* Step 1 */}
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Step 1</h5>
                    <div className="row align-items-center">
                        <div className="col-sm-6">
                            <p className="card-text">
                                Login to your Account in telegram and make a search a bot with name "<b>BotFather</b>".
                                Click on him.
                            </p>
                        </div>
                        <div className="col-sm-6">
                            <img src="/static/faq/10.png" alt="step 1" style={{maxWidth: '320px'}} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Step 2 */}
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Step 2</h5>
                    <div className="row align-items-center">
                        <div className="col-sm-6">
                            <p className="card-text">
                                Write a first message with text "<code>/newbot</code>" (<i>with slash</i>) to "<b>BotFather</b>".
                            </p>
                        </div>
                        <div className="col-sm-6">
                            <img src="/static/faq/20.png" alt="step 2" style={{maxWidth: '320px'}} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Step 3 */}
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Step 3</h5>
                    <div className="row align-items-center">
                        <div className="col-sm-6">
                            <p className="card-text">
                                The "<b>BotFather</b>" will handle a message and will say what to do next and next step
                                will be setting the name of bot.<br/>
                                Write a message witch be contains a desired name of the future bot.
                            </p>
                        </div>
                        <div className="col-sm-6">
                            <img src="/static/faq/30.png" alt="step 3" style={{maxWidth: '320px'}} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Step 4 */}
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Step 4</h5>
                    <div className="row align-items-center">
                        <div className="col-sm-6">
                            <p className="card-text">
                                Next question - what a username of the bot?<br/>
                                Username - is unique name in telegram and must end in `<code>bot</code>` as "<b>BotFather</b>" say.<br />
                                Please write a desired username of the bot
                            </p>
                        </div>
                        <div className="col-sm-6">
                            <img src="/static/faq/40.png" alt="step 4" style={{maxWidth: '320px'}} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Step 5 */}
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Step 5</h5>
                    <div className="row align-items-center">
                        <div className="col-sm-6">
                            <p className="card-text">
                                Сongratulations! Your bot has successfully created.<br/>
                                Please store a token to access the HTTP API in <b>safe place</b>
                            </p>
                        </div>
                        <div className="col-sm-6">
                            <img src="/static/faq/45.png" alt="step 5" style={{maxWidth: '320px'}} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Step 6 */}
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Step 6</h5>
                    <div className="row align-items-center">
                        <div className="col-sm-6">
                            <p className="card-text">
                                Add a bot to the chat(s) which interested in.<br />
                                It is a last step with telegram
                            </p>
                        </div>
                        <div className="col-sm-6">
                            <img src="/static/faq/50.png" alt="step 6" style={{maxWidth: '320px'}} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Step 7 */}
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Step 7</h5>
                    <div className="row align-items-center">
                        <div className="col-sm-6">
                            <p className="card-text">
                                Go to our platform now.<br />
                                Click on "<b>Add bot</b>" button from the <code>bots</code> page.
                            </p>
                        </div>
                        <div className="col-sm-6">
                            <img src="/static/faq/60.png" alt="step 7" style={{maxWidth: '320px'}} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Step 8 */}
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Step 8</h5>
                    <div className="row align-items-center">
                        <div className="col-sm-6">
                            <p className="card-text">
                                Put a label for identify a bot and a token what was received on bot creation step.
                            </p>
                        </div>
                        <div className="col-sm-6">
                            <img src="/static/faq/70.png" alt="step 8" style={{maxWidth: '320px'}} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Step 9 */}
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Step 9</h5>
                    <div className="row align-items-center">
                        <div className="col-sm-6">
                            <p className="card-text">
                                Click to "<b>Add chat</b>" button.
                            </p>
                        </div>
                        <div className="col-sm-6">
                            <img src="/static/faq/80.png" alt="step 9" style={{maxWidth: '320px'}} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Step 9 */}
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Step 9</h5>
                    <div className="row align-items-center">
                        <div className="col-sm-6">
                            <p className="card-text">
                                Add a group/chat username which bot should to know and handle.<br />
                                A username could be found in telegram group/chat info
                            </p>
                        </div>
                        <div className="col-sm-6">
                            <img src="/static/faq/90.png" alt="step 9" style={{maxWidth: '320px'}} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Final */}
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Final</h5>
                    <p className="card-text">
                        Сongratulations! Bot was successfully created and added to platform.<br />
                        Now you can add a message for future send and create a schedule.
                    </p>
                </div>
            </div>

        </DashboardLayout>
    }
}

export default connect(
    state => state,
    actions
)(FAQPage);
