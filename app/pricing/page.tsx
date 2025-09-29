import Link from "next/link";
export default function Pricing() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-bold mb-6">Pricing</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-2xl p-6 shadow-soft">
          <h2 className="text-xl font-semibold">Standard</h2>
          <p className="text-gray-600 mt-2">Pay per course.</p>
          <p className="mt-4">
            <span className="text-3xl font-bold">$X</span> / course
          </p>
          <Link href="/courses" className="btn btn-outline mt-6">
            Browse Courses
          </Link>
        </div>
        <div className="border rounded-2xl p-6 shadow-soft">
          <h2 className="text-xl font-semibold">VIP</h2>
          <p className="text-gray-600 mt-2">
            Enroll free in up to 3 courses.
          </p>
          <p className="mt-4">
            <span className="text-3xl font-bold text-innova-purple">$Y</span>{" "}
            / one-time
          </p>
          <Link href="/auth/sign-up" className="btn btn-primary mt-6">
            Become VIP
          </Link>
        </div>
      </div>
    </div>
  );
}
