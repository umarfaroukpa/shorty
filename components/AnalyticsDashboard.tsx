import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';

interface AnalyticsData {
    totalClicks: number;
    referrers: { [key: string]: number };
    countries: { [key: string]: number };
}

const AnalyticsDashboard: React.FC<{ url: string }> = ({ url }) => {
    const [data, setData] = useState<AnalyticsData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/analytics', { params: { url } });
                console.log('Fetched data:', response.data);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching analytics data:', error);
            }
        };

        fetchData();
    }, [url]);

    if (!data) return <div>Loading...</div>;

    return (
        <div className="p-4 flex flex-col items-center text-gradient pb-24">
            <h2 className="text-2xl font-bold mb-4">Analytics for {url}</h2>
            <div className="mb-4">
                <h3 className="text-xl font-semibold">Total Clicks: {data.totalClicks}</h3>
            </div>
            <div className="mb-4">
                <h3 className="text-xl font-semibold">Referrers</h3>
                <ul>
                    {Object.entries(data.referrers).map(([referrer, count]) => (
                        <li key={referrer}>
                            {referrer}: {count}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mb-4">
                <h3 className="text-xl font-semibold">Countries</h3>
                <ul>
                    {Object.entries(data.countries).map(([country, count]) => (
                        <li key={country}>
                            {country}: {count}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
