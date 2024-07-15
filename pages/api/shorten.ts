import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import dbConnect from '../../utils/dbConnect';
import Url from '../../models/Url';
import { generateQRCode } from '../../utils/generateQRCode'; // Named import

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { originalUrl } = req.body;

    await dbConnect();

    const shortUrl = `https://shorty.com/${Math.random().toString(36).substring(7)}`;
    const qrCode = await generateQRCode(shortUrl);

    const newUrl = new Url({
        originalUrl,
        shortUrl,
        qrCode,
        userId: session.user.id,
    });

    await newUrl.save();

    res.status(201).json({ shortUrl, qrCode });
};
