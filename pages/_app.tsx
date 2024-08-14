import React from 'react';
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import Loading from '../components/Loading';
import ErrorBoundary from '../components/ErrorBoundary';

function MyApp({ Component, pageProps }: AppProps) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = () => setLoading(true);
        const handleComplete = () => setLoading(false);

        Router.events.on('routeChangeStart', handleStart);
        Router.events.on('routeChangeComplete', handleComplete);
        Router.events.on('routeChangeError', handleComplete);

        return () => {
            Router.events.off('routeChangeStart', handleStart);
            Router.events.off('routeChangeComplete', handleComplete);
            Router.events.off('routeChangeError', handleComplete);
        };
    }, []);

    return (
        <SessionProvider session={pageProps.session}>
            <ErrorBoundary>
                {loading ? <Loading /> : <Component {...pageProps} />}
            </ErrorBoundary>
        </SessionProvider>
    );
}

export default MyApp;
