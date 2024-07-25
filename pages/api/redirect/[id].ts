import { NextApiRequest, NextApiResponse } from 'next';

const urlStore: { [key: string]: string } = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    const longUrl = urlStore[id as string];
    if (longUrl) {
        res.redirect(longUrl);
    } else {
        res.status(404).json({ message: 'URL not found' });
    }
}
