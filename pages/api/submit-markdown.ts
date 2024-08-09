import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import dbConnect from '../../utils/dbConnect';
import MarkdownModel from '@../../../models/Markdown';

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { content } = req.body;

        try {
            // Connect to the database
            await dbConnect();

            // Save to MongoDB
            await MarkdownModel.create({ content });

            // Send email
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: 'yasmarfaq51@gmail.com',
                subject: 'New Markdown Content',
                text: `New markdown content received:\n\n${content}`,
            });

            res.status(200).json({ message: 'Content received and email sent successfully!' });
        } catch (error) {
            console.error('Error handling request:', error);
            res.status(500).json({ message: 'Failed to handle request.' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};
