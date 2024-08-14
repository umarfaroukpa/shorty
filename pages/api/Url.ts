import React from 'react';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import dbConnect from '../../utils/dbConnect';
import Url from '../../models/Url';

const fetchUrlsFromDatabase = async (userId: string) => {
    await dbConnect();
    console.log('Fetching URLs for userId:', userId);
    const urls = await Url.find({ userId }).exec();
    console.log('URLs found:', urls);
    return urls;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    if (!session) {
        console.log('No session found');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = session.user.id;
    console.log('Session found, userId:', userId);

    if (req.method === 'GET') {
        try {
            const urls = await fetchUrlsFromDatabase(userId);
            return res.status(200).json({ urls });
        } catch (error) {
            console.error('Error fetching URLs:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
};

export default handler;
