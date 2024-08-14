import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import dbConnect from '../../utils/dbConnect';
import Post, { IPost } from '../../models/Post';

interface Params extends ParsedUrlQuery {
    id: string;
}

interface PostPageProps {
    post: IPost;
}

export const getStaticPaths: GetStaticPaths = async () => {
    await dbConnect();

    // Fetch posts and type them as IPost[]
    const posts = await Post.find({}).lean();

    // Create paths from posts
    const paths = posts.map((post: { _id: any }) => ({
        params: { id: post._id.toString() },
    }));

    return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<PostPageProps, Params> = async (context) => {
    await dbConnect();

    if (!context.params || !context.params.id) {
        return { notFound: true };
    }

    const { id } = context.params;
    const post = await Post.findById(id).lean();

    if (!post) {
        return { notFound: true };
    }

    return {
        props: {
            post: post as IPost,
        },
        revalidate: 1,
    };
};

const PostPage = ({ post }: PostPageProps) => {
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
    );
};

export default PostPage;
