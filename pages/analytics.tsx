import React, { Suspense } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AnalyticsDashboard = React.lazy(() => import('../components/AnalyticsDashboard'));

const AnalyticsPage: React.FC = () => {
    const url = 'example-url';

    return (
        <div>
            <Navbar onLoginClick={() => { /* Handle login */ }} onSignupClick={() => { /* Handle signup */ }} />
            <main className="mt-20">
                <div className="container mx-auto p-4">
                    <h1 className="text-3xl font-bold mb-20 text-center text-gradient">Analytics</h1>
                    <Suspense fallback={<div>Loading...</div>}>
                        <AnalyticsDashboard url={url} />
                    </Suspense>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AnalyticsPage;
