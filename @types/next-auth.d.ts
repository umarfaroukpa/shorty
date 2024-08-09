import NextAuth, { DefaultSession } from 'next-auth';
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface Session {
        accessToken?: string;
        user: {
            id: string;
            name: string;
            email: string;
            premium: boolean;
        } & DefaultSession["user"];

    }

    interface User {
        id: string;
        name: string;
        email: string;
        premium: boolean;
        accessToken?: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        name: string;
        email: string;
        premium: boolean;
        accessToken?: string;
    }
}

