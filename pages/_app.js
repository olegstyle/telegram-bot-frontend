import {Provider} from 'react-redux';
import App, {Container} from 'next/app';
import withRedux from 'next-redux-wrapper';
import {initStore} from '../redux';
import React from "react";
import Styles from "../styles/loading.scss";
import Head from "next/head";
import {ToastContainer} from "react-toastify";
import ReactToastifyStyles from 'react-toastify/dist/ReactToastify.css';

export default withRedux(initStore, {debug: true})(
    class MyApp extends App {
        constructor(props) {
            super(props);
            this.handleLoad = this.handleLoad.bind(this);
        }

        static async getInitialProps({Component, ctx}) {
            return {
                pageProps: {
                    ...(Component.getInitialProps
                        ? await Component.getInitialProps(ctx)
                        : {})
                }
            };
        }

        handleLoad() {
            const loader = document.getElementById('loader');
            setTimeout(() => {
                loader.classList.add('fadeOut');
            }, 100);
        }

        componentDidMount() {
            window.addEventListener("load", this.handleLoad);
        }

        componentWillUnmount() {
            window.removeEventListener("load", this.handleLoad);
        }

        render() {
            const {Component, pageProps, store} = this.props;
            return (
                <Container>
                    <Head>
                        <title>---</title>
                        <style dangerouslySetInnerHTML={{__html: Styles}}/>
                        <style dangerouslySetInnerHTML={{__html: ReactToastifyStyles}}/>
                        <script src="https://code.jquery.com/jquery-3.4.1.slim.js"
                                integrity="sha256-BTlTdQO9/fascB1drekrDVkaKd9PkwBymMlHOiG+qLI="
                                crossOrigin="anonymous" />
                        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
                                integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
                                crossOrigin="anonymous"/>
                    </Head>
                    <div id='loader'>
                        <div className="spinner"/>
                    </div>
                    <Provider store={store}>
                        <Component {...pageProps} />
                        <ToastContainer
                            position="top-right"
                            autoClose={2500}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnVisibilityChange
                            draggable
                            pauseOnHover
                        />
                    </Provider>
                </Container>
            );
        }
    }
);
