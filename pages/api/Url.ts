import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import dbConnect from '../../utils/dbConnect';
import Url from '../../models/Url';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const session = await getSession({ req });

        if (!session || !session.user || !session.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        await dbConnect();

        const urls = await Url.find({ userId: session.user.id });

        if (!urls) {
            return res.status(404).json({ message: 'No URLs found' });
        }

        res.status(200).json(urls);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
