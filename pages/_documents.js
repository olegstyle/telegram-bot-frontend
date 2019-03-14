import Document, {Head, Main, NextScript} from 'next/document'

export default class extends Document {
    render() {
        return (
            <html lang={this.props.__NEXT_DATA__.props.pageProps.lang || 'en'}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta charSet="utf-8"/>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
            </html>
        )
    }
}
