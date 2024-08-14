import React from 'react';
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/dbConnect';
import Url from '../../../models/Url';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // Connect to the database
    await dbConnect();

    // Extract shortCode from the request query
    const shortCode = req.query.shortCode as string;

    console.log('Received shortCode:', shortCode);

    // Validate the shortCode format
    if (!shortCode || typeof shortCode !== 'string') {
        console.log('Invalid shortCode format');
        return res.status(400).json({ message: 'Invalid shortCode format' });
    }

    try {
        // Log the entire request query for debugging
        console.log('Request Query:', req.query);

        // Query the database for the URL entry
        const urlEntry = await Url.findOne({ shortCode }).exec();

        console.log('Found urlEntry:', urlEntry);

        // Check if the URL entry was found
        if (urlEntry) {
            // Ensure the URL starts with 'http'
            const originalUrl = urlEntry.originalUrl.startsWith('http')
                ? urlEntry.originalUrl
                : `http://${urlEntry.originalUrl}`;

            console.log('Redirecting to:', originalUrl);

            // Redirect to the original URL
            res.redirect(302, originalUrl);
        } else {
            // Handle case where the URL is not found
            console.log('URL not found for shortCode:', shortCode);
            res.status(404).json({ message: 'URL not found' });
        }
    } catch (error) {
        // Log and respond with an internal server error
        console.error('Error fetching URL:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default handler;
