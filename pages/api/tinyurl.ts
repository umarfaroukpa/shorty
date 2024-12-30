import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { originalUrl, customUrl } = req.body;

        try {
            const response = await fetch('https://api.tinyurl.com/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.TINYURL_API_KEY}`,
                },
                body: JSON.stringify({
                    url: originalUrl,
                    domain: 'tinyurl.com',
                    alias: customUrl || '', // pass alias if exists
                }),
            });

            const data = await response.json();

            if (response.ok && data?.data?.tiny_url) {
                return res.status(200).json({ shortUrl: data.data.tiny_url });
            } else {
                console.error('TinyURL API Error:', data?.errors || data);
                return res.status(response.status).json({
                    error: data?.errors?.[0]?.message || 'Failed to shorten URL',
                });
            }
        } catch (error) {
            console.error('Error shortening URL with TinyURL:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};

export default handler;
