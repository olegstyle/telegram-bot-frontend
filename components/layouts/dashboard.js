import Head from 'next/head';
import Styles from '../../styles/dashboard.scss';
import React from "react";
import Sidebar from '../nav/sidebar';
import Topbar from '../nav/topbar';
import Footer from '../nav/footer';
import Popper from 'popper.js';
import ConfirmStyles from 'react-confirm-alert/src/react-confirm-alert.css';
import CronBuilderStyles from 'react-cron-builder/dist/bundle.css';
import PerfectScrollbar from 'perfect-scrollbar';
import PerfectScrollbarStyle from 'perfect-scrollbar/css/perfect-scrollbar.css';
import * as $ from "jquery";

export default class extends React.Component {
    static async getInitialProps(context) {
        if (!context.isServer) {
            window.Popper = Popper;
        }
    }

    componentDidUpdate() {
        const scrollables = $('.scrollable, #__next');
        if (scrollables.length > 0) {
            scrollables.each((index, el) => {
                new PerfectScrollbar(el);
            });
        }
    }

    render() {
        return <div>
            <Head>
                <title>{this.props.title}</title>
                <style dangerouslySetInnerHTML={{__html: ConfirmStyles}}/>
                <style dangerouslySetInnerHTML={{__html: CronBuilderStyles}}/>
                <style dangerouslySetInnerHTML={{__html: PerfectScrollbarStyle}}/>
                <style dangerouslySetInnerHTML={{__html: Styles}}/>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
                      integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay"
                      crossOrigin="anonymous"/>
            </Head>
            <div>
                <Sidebar/>
                <div className="page-container">
                    <Topbar/>
                    <main className="main-content bgc-grey-100 h-100">
                        <div id="mainContent">
                            {this.props.children}
                        </div>
                    </main>
                    <Footer/>
                </div>
            </div>
        </div>
    }
}
