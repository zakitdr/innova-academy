import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./lib/prisma";
import authConfig from "./auth.config";

type Creds = { email?: string; password?: string };

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = (credentials ?? {}) as Creds;
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? undefined,
          role: user.role,
          isVIP: user.isVIP,
          vipFreeUsed: user.vipFreeUsed,
        } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
        token.isVIP = (user as any).isVIP;
        token.vipFreeUsed = (user as any).vipFreeUsed;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).user.id = token.id as string;
      (session as any).user.role = token.role as string;
      (session as any).user.isVIP = token.isVIP as boolean;
      (session as any).user.vipFreeUsed = token.vipFreeUsed as number;
      return session;
    },
  },
});
