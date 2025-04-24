// /app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {PrismaAdapter} from '@next-auth/prisma-adapter';
import {prisma} from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {label: 'Email', type: 'email'},
        password: {label: 'Password', type: 'password'}
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {email: credentials?.email}
        });

        if (!user) throw new Error('No user found');

        const isValid = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!isValid) throw new Error('Incorrect password');

        return {
          id: user.id,
          name: user.name,
          email: user.email
        };
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/signin', // Optional: custom signin page
    error: '/signin' // Redirect error to signin with error param
  },
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({session, token}) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    }
  }
});

export {handler as GET, handler as POST};
