import Head from 'next/head';
import Styles from '../../styles/auth.scss';

export default (props) => (
    <div>
        <Head>
            <title>{props.title}</title>
            <style dangerouslySetInnerHTML={{__html: Styles}}/>
            <link href="/static/fonts/material-icon/css/material-design-iconic-font.min.css" rel="stylesheet" />
        </Head>
        <div className="main">
            {props.children}
        </div>
    </div>
);
