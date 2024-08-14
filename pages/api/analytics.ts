import React from 'react';
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../utils/dbConnect';
import Click from '../../models/Click';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    if (req.method === 'GET') {
        const { url } = req.query;

        if (!url || typeof url !== 'string') {
            return res.status(400).json({ error: 'Invalid URL' });
        }

        try {
            const clicks = await Click.find({ url });
            const totalClicks = clicks.length;

            const referrers = clicks.reduce((acc, click) => {
                acc[click.referrer] = (acc[click.referrer] || 0) + 1;
                return acc;
            }, {});

            const countries = clicks.reduce((acc, click) => {
                acc[click.country] = (acc[click.country] || 0) + 1;
                return acc;
            }, {});

            res.status(200).json({ totalClicks, referrers, countries });
        } catch (error) {
            console.error('Error fetching analytics data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
