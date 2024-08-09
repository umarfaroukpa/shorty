import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../utils/dbConnect';
import Url from '../../models/Url';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    const { shortCode } = req.query;

    console.log('Received shortCode:', shortCode);

    try {
        const urlEntry = await Url.findOne({ shortCode: shortCode as string });

        console.log('Found urlEntry:', urlEntry);

        if (urlEntry) {
            const originalUrl = urlEntry.originalUrl.startsWith('http')
                ? urlEntry.originalUrl
                : `http://${urlEntry.originalUrl}`;

            console.log('Redirecting to:', originalUrl);

            res.writeHead(302, { Location: originalUrl });
            res.end();
        } else {
            res.status(404).json({ message: 'URL not found' });
        }
    } catch (error) {
        console.error('Error fetching URL:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
