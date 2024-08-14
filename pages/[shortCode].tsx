import React from 'react';
import { GetServerSideProps } from 'next';
import dbConnect from '../utils/dbConnect';
import Url from '../models/Url';

export const getServerSideProps: GetServerSideProps = async (context) => {
    await dbConnect();

    const { shortCode } = context.params;
    const urlEntry = await Url.findOne({ shortCode }).exec();

    if (urlEntry) {
        const originalUrl = urlEntry.originalUrl.startsWith('http')
            ? urlEntry.originalUrl
            : `http://${urlEntry.originalUrl}`;

        return {
            redirect: {
                destination: originalUrl,
                permanent: false,
            },
        };
    } else {
        return {
            notFound: true,
        };
    }
};

const RedirectPage = () => {
    // This page should never be rendered
    return null;
};

export default RedirectPage;
