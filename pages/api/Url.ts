import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import dbConnect from '../../utils/dbConnect';
import Url from '../../models/Url';
import { nanoid } from 'nanoid';
import QRCode from 'qrcode';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(`Received ${req.method} request`, req.body);
    await dbConnect();

    const session = await getSession({ req });
    console.log('Session:', session);

    if (!session || !session.user || !session.user.id) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = session.user.id;

    if (req.method === 'POST') {
        const { originalUrl } = req.body;

        if (!originalUrl || typeof originalUrl !== 'string') {
            return res.status(400).json({ error: 'Invalid URL' });
        }

        try {
            const shortCode = nanoid(7);
            const shortUrl = `${req.headers.origin}/${shortCode}`;
            const qrCode = await QRCode.toDataURL(shortUrl);

            const newUrl = new Url({
                originalUrl,
                shortUrl,
                shortCode,
                qrCode,
                userId,
            });

            await newUrl.save();

            res.status(201).json({ message: 'URL created successfully', shortUrl, qrCode });
        } catch (error) {
            console.error('Error creating short URL:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else if (req.method === 'GET') {
        try {
            const urls = await Url.find({ userId });

            if (!urls || urls.length === 0) {
                return res.status(404).json({ message: 'No URLs found' });
            }

            res.status(200).json({ urls });
        } catch (error) {
            console.error('Error fetching URLs:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
