// components/Navbar.tsx
import Link from "next/link";
import Image from "next/image";
import { auth, signOut } from "../auth";  // <-- correct relative path from /components to /auth

export const dynamic = "force-dynamic";

export default async function Navbar() {
  const session = await auth();
  const user = session?.user as any | undefined;
  const loggedIn = !!user;
  const role = user?.role as string | undefined;
  const isAdmin = (role ?? "").toUpperCase() === "ADMIN";

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Innova Academy" width={40} height={40} />
          <span className="font-bold text-xl text-innova-purple">Innova Academy</span>
        </Link>

        <nav className="ml-auto flex items-center gap-6">
          <Link href="/">Home</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/contact">Contact</Link>

          {isAdmin && <Link href="/admin">Admin</Link>}

          {loggedIn ? (
            <>
              <Link href="/dashboard" className="btn btn-outline">Dashboard</Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button className="btn btn-primary" type="submit">Sign out</button>
              </form>
            </>
          ) : (
            <>
              <Link href="/auth/sign-in" className="btn btn-outline">Sign in</Link>
              <Link href="/auth/sign-up" className="btn btn-primary">Create account</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
