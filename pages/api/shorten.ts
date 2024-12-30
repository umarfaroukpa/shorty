import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { nanoid } from 'nanoid';
import QRCode from 'qrcode';
import dbConnect from '../../utils/dbConnect';
import Url from '../../models/Url'; // URL model for saving in MongoDB

const TINYURL_API_KEY = process.env.TINYURL_API_KEY;

const shortenWithTinyURL = async (originalUrl: string, customAlias?: string) => {
    const response = await axios.post('https://api.tinyurl.com/create', {
        url: originalUrl,
        alias: customAlias || '',
    }, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TINYURL_API_KEY}`,
        },
    });
    return response.data?.data?.tiny_url;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect(); // MongoDB connection

    if (req.method === 'POST') {
        const { originalUrl, customUrl } = req.body;

        if (!originalUrl || typeof originalUrl !== 'string') {
            return res.status(400).json({ error: 'Invalid URL' });
        }

        try {
            // Shorten URL using TinyURL
            const shortUrl = await shortenWithTinyURL(originalUrl, customUrl);

            // Optionally generate a QR code for the shortened URL
            const qrCode = await QRCode.toDataURL(shortUrl);

            // Save to DB
            const newUrl = new Url({
                originalUrl,
                shortUrl,
                customUrl,
                qrCode,
            });
            await newUrl.save();

            res.status(201).json({ shortUrl, qrCode });
        } catch (error) {
            console.error('Error shortening URL:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
