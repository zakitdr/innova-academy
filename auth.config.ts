import type { NextAuthConfig } from "next-auth";

// Keep only global options here; providers are set in auth.ts
export default {
  session: { strategy: "jwt" },
  trustHost: true,
} satisfies Partial<NextAuthConfig>;
