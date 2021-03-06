import Head from 'next/head';
import Styles from '../../styles/loading.scss';

export default (props) => (
    <div>
        <Head>
            <title>{props.title}</title>
            <style dangerouslySetInnerHTML={{__html: Styles}}/>
        </Head>
        <div>{props.children}</div>
    </div>
);
