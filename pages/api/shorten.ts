// pages/api/shorten.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { url } = req.body;

        if (!url || typeof url !== 'string') {
            return res.status(400).json({ error: 'Invalid URL' });
        }

        // Example logic for URL shortening
        const shortUrl = `${req.headers.origin}/${nanoid(7)}`;
        const qrCode = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(shortUrl)}`;

        res.status(200).json({ shortUrl, qrCode });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
