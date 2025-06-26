import NextAuth, { DefaultSession } from 'next-auth';
import Discord from 'next-auth/providers/discord';

declare module 'next-auth' {
  interface Session {
    user: {
      isAdmin: boolean;
    } & DefaultSession['user'];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Discord],
  callbacks: {
    jwt: async ({ token, profile }) => {
      if (profile) {
        return {
          ...token,
          id: profile.id,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      const isAdmin = process.env
        .ADMIN_IDS!.split(',')
        .includes(token.id as string);
      session.user.id = token.id as string;
      session.user.isAdmin = isAdmin;
      return session;
    },
  },
});
