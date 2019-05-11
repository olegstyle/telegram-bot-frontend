import Head from 'next/head';
import Styles from '../../styles/dashboard.scss';
import React from "react";
import Sidebar from '../nav/sidebar';
import Topbar from '../nav/topbar';
import Footer from '../nav/footer';
import Popper from 'popper.js';

export default class extends React.Component {
    static async getInitialProps(context) {
        if (!context.isServer) {
            window.Popper = Popper;
        }
    }

    render() {
        return <div>
            <Head>
                <title>{this.props.title}</title>
                <style dangerouslySetInnerHTML={{__html: Styles}}/>
                <script src="https://code.jquery.com/jquery-3.4.1.slim.js"
                        integrity="sha256-BTlTdQO9/fascB1drekrDVkaKd9PkwBymMlHOiG+qLI="
                        crossOrigin="anonymous" />
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
                        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
                        crossOrigin="anonymous"/>
            </Head>
            <div>
                <div id='loader'>
                    <div className="spinner"/>
                </div>
                <Sidebar/>
                <div className="page-container">
                    <Topbar/>
                    <main id="mainContent" className="main-content bgc-grey-100 h-100">
                        {this.props.children}
                    </main>
                    <Footer/>
                </div>
            </div>
        </div>
    }
}
