"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic"; // prevent static prerender for this page

function SignInInner() {
  const router = useRouter();
  const params = useSearchParams(); // now safely inside Suspense (via wrapper)
  const redirect = params?.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: redirect,
    });
    setLoading(false);
    if (res?.ok) {
      router.push(redirect);
    } else {
      setError(res?.error || "Invalid email or password");
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-14">
      <h1 className="text-2xl font-bold mb-4">Sign in</h1>
      <form className="space-y-4" onSubmit={onSubmit}>
        <input
          className="w-full border rounded-2xl px-4 py-2"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <input
          className="w-full border rounded-2xl px-4 py-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button disabled={loading} className="btn btn-primary w-full" type="submit">
          {loading ? "Signing in..." : "Continue"}
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="max-w-md mx-auto px-4 py-14">Loading…</div>}>
      <SignInInner />
    </Suspense>
  );
}
