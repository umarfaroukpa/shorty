import { GetServerSideProps } from 'next';
import dbConnect from '../utils/dbConnect';
import Url from '../models/Url';


// this to handle the URL redirection based on a shortCode parameter.
export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        await dbConnect();

        const { shortCode } = context.params;
        console.log('Fetching URL for shortCode:', shortCode);
        const urlEntry = await Url.findOne({ shortCode }).exec();
        console.log('URL Entry:', urlEntry);
        // use tenary operator that determines the value of the baseUrl variable 
        // based on the environment in which the application is running. Here's a breakdown of what it does:
        if (urlEntry) {
            const originalUrl = urlEntry.originalUrl.startsWith('http')
                ? urlEntry.originalUrl
                : `http://${urlEntry.originalUrl}`;
            console.log('Redirecting to:', originalUrl);

            return {
                redirect: {
                    destination: originalUrl,
                    permanent: false,
                },
            };
        } else {
            console.log('No URL entry found for shortCode:', shortCode);
            return {
                notFound: true,
            };
        }
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        return {
            notFound: true,
        };
    }
};

const RedirectPage = () => {
    return null;
};

export default RedirectPage;
