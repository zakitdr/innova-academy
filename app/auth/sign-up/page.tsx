"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    setLoading(false);
    const data = await res.json().catch(()=>({}));
    if (res.ok) {
      setOk(true);
      setTimeout(()=>router.push("/auth/sign-in"), 800);
    } else {
      setError(data.error || "Could not create account");
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-14">
      <h1 className="text-2xl font-bold mb-4">Create account</h1>
      <form className="space-y-4" onSubmit={onSubmit}>
        <input className="w-full border rounded-2xl px-4 py-2" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full border rounded-2xl px-4 py-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border rounded-2xl px-4 py-2" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button disabled={loading} className="btn btn-primary w-full" type="submit">{loading ? "Creating..." : "Sign up"}</button>
        {ok && <p className="text-sm text-green-700">Account created! Redirecting…</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>
    </div>
  )
}
