import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    {/* Favicon */}
                    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
                    {/* For additional icons */}
                    <link rel="icon" href="/favicon.png" type="image/png" />

                    {/* You can also specify a 192x192 image for mobile screens */}
                    <link rel="icon" href="/favicon-192x192.png" sizes="192x192" />
                    {/* Apple Touch Icon */}
                    <link rel="apple-touch-icon" href="/apple-icon.png" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
