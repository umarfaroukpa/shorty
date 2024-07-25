// @types/types.d.ts

import 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            premium?: boolean; // Add premium property
        };
    }

    interface User {
        id: string;
        email: string;
        premium: boolean; // Add premium property
    }
}
