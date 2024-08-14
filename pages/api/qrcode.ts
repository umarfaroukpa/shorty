import React from 'react';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import dbConnect from '../../utils/dbConnect';
import Url from '../../models/Url';

interface User {
    id?: string;  // Make 'id' optional
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const session = await getSession({ req });

        if (!session || !session.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        await dbConnect();

        const user: User = {
            id: session.user.id,
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
        };

        const urls = await Url.find({ userId: user.id });

        if (!urls) {
            return res.status(404).json({ message: 'No URLs found' });
        }

        res.status(200).json(urls);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
export default handler;