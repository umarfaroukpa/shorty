import { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';
import QRCode from 'qrcode';
import dbConnect from '../../utils/dbConnect';
import Url from '../../models/Url';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

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


// pages/api/shorten.ts
// pages/api/shorten.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import dbConnect from '../../utils/dbConnect';
// import Url from '../../models/Url';
// import generateShortCode from '../../utils/generateShortCode';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     await dbConnect();

//     const { originalUrl } = req.body;

//     if (!originalUrl) {
//         return res.status(400).json({ message: 'Original URL is required' });
//     }

//     const shortCode = generateShortCode();

//     const urlEntry = new Url({
//         originalUrl,
//         shortCode,
//     });

//     try {
//         await urlEntry.save();
//         console.log('URL entry created:', urlEntry);
//         res.status(201).json({ shortCode });
//     } catch (error) {
//         console.error('Error creating URL entry:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// }
