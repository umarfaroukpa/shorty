import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import dbConnect from '../../../utils/dbConnect';
import User, { IUser } from '../../../models/User';

dbConnect();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('Missing credentials');
        }

        try {
          await dbConnect();
          const user: IUser | null = await User.findOne({ email: credentials.email }).exec();
          console.log('User found:', user);

          if (user && await user.comparePassword(credentials.password)) {
            return { id: user._id.toString(), email: user.email, premium: user.premium, name: user.name };
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
  callbacks: {
    async jwt({ token, user }) {
      console.log('JWT Callback - Token:', token);
      if (user) {
        console.log('JWT Callback - User:', user);
        token.id = user.id;
        token.premium = user.premium;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('Session Callback - Token:', token);
      if (token?.id) {
        session.user = {
          id: token.id as string,
          premium: token.premium as boolean || false,
          name: token.name as string
        };
      }
      return session;
    }
  }
});


