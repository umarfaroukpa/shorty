import { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';
import QRCode from 'qrcode';
import dbConnect from '../../utils/dbConnect';
import Url from '../../models/Url';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    // The code fetches the original URL from the database
    if (req.method === 'POST') {
        const { originalUrl, customDomain, customUrl } = req.body;

        if (!originalUrl || typeof originalUrl !== 'string') {
            return res.status(400).json({ error: 'Invalid URL' });
        }

        try {
            // he nanoid library is used to generate a short code. 
            // The base URL is determined by checking if the environment is production
            let shortCode = customUrl || nanoid(7);
            const baseUrl = process.env.NODE_ENV === 'production'
                ? process.env.NEXTAUTH_URL
                : 'http://localhost:3000';

            const shortUrl = customDomain
                ? `${customDomain}/${shortCode}`
                : `${baseUrl}/${shortCode}`;
            // generates a QR code for the shortened URL.
            const qrCode = await QRCode.toDataURL(shortUrl);

            const newUrl = new Url({
                originalUrl,
                shortUrl,
                shortCode,
                qrCode,
            });

            await newUrl.save();

            res.status(201).json({ message: 'URL shortened successfully', shortUrl, qrCode });
        } catch (error) {
            console.error('Error saving URL:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
