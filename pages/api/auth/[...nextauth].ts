import { Secret, sign } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth';
import NextAuth, { RequestInternal } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import dbConnect from '../../../utils/dbConnect';
import User, { IUser } from '../../../models/User';

require('dotenv').config();

// Secret key for JWT
const SECRET_KEY: Secret = process.env.JWT_SECRET || '2119e1be47b2c1630d86ee6b288a6ad193d654d442702dc8d709ff4be2bf408f29a82f78902205a2d7061147b476c1df';

// Function to generate the access token
function generateAccessToken(user: IUser): string {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    premium: user.premium
  };

  const options = {
    expiresIn: '1h' // Token expires in 1 hour
  };

  return sign(payload, SECRET_KEY, options);
}

dbConnect();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">) {
        if (!credentials) {
          throw new Error('Missing credentials');
        }

        try {
          await dbConnect();
          const user: IUser | null = await User.findOne({ email: credentials.email }).exec();
          console.log('User found:', user);

          if (user && await user.comparePassword(credentials.password)) {
            const accessToken = generateAccessToken(user);
            return {
              id: user._id.toString(),
              email: user.email,
              premium: user.premium,
              name: user.name,
              accessToken // Ensure accessToken is returned here
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error('Error in authorization:', error);
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    })
  ],
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT, user?: any }) { // Use 'any' for user to include accessToken
      console.log('JWT Callback - Token:', token);
      if (user) {
        console.log('JWT Callback - User:', user);
        token.id = user.id;
        token.premium = user.premium;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = user.accessToken; // Ensure access token is added to token
      }
      return token;
    },
    async session({ session, token }: { session: Session, token: JWT }) {
      console.log('Session Callback - Token:', token);
      if (token?.id) {
        session.user = {
          id: token.id as string,
          premium: token.premium as boolean || false,
          name: token.name as string,
          email: token.email as string,
        };
        session.accessToken = token.accessToken; // Ensure access token is added to session
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin', // Display the sign-in page
    signOut: '/auth/signout', // Display the sign-out page
    error: '/auth/error', // Display the error page
  },
  debug: true, // Enable debug mode for detailed logs
});
