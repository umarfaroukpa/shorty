import { GetServerSideProps } from 'next';
import axios from 'axios';
import dbConnect from '../utils/dbConnect';
import Url from '../models/Url';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { shortCode } = context.params;

    try {
        await dbConnect();
        const urlEntry = await Url.findOne({ shortCode }).exec();

        if (urlEntry) {
            return {
                redirect: {
                    destination: urlEntry.originalUrl,
                    permanent: false,
                },
            };
        }

        // Check Rebrandly if the code doesn't exist in your DB
        const response = await axios.get(`https://api.rebrandly.com/v1/links/${shortCode}`, {
            headers: {
                'apikey': process.env.REBRANDLY_API_KEY,
            },
        });

        if (response.data) {
            return {
                redirect: {
                    destination: response.data.destination,
                    permanent: false,
                },
            };
        }

        return {
            notFound: true,
        };

    } catch (error) {
        console.error('Error during redirection:', error);
        return {
            notFound: true,
        };
    }
};

const RedirectPage = () => {
    return null;
};

export default RedirectPage;
