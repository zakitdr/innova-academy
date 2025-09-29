import { auth, signOut } from "../../auth";


export default async function Dashboard() {
  const session = await auth();
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">My Dashboard</h1>
      {!session?.user ? (
        <p className="text-gray-600 mt-2">Please sign in.</p>
      ) : (
        <div className="mt-4 space-y-2">
          <div>
            <span className="font-semibold">Email:</span> {session.user.email}
          </div>
          <div>
            <span className="font-semibold">Role:</span>{" "}
            {(session.user as any).role}
          </div>
          <div>
            <span className="font-semibold">VIP:</span>{" "}
            {(session.user as any).isVIP ? "Yes" : "No"}
          </div>
          <div>
            <span className="font-semibold">Free courses used:</span>{" "}
            {(session.user as any).vipFreeUsed ?? 0} / 3
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button className="btn btn-outline mt-4" type="submit">
              Sign out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
