import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <section className="bg-gradient-to-b from-white to-yellow-50/40">
      <div className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Learn. Grow. <span className="text-innova-gold">Innovate.</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Innova Academy offers high-impact courses with limited seats. VIP
            members can enroll in up to 3 courses for free.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="/courses" className="btn btn-primary">
              Browse Courses
            </Link>
            <Link href="/pricing" className="btn btn-outline">
              See Pricing
            </Link>
          </div>
          <ul className="mt-8 grid grid-cols-3 gap-4 text-center">
            <li className="p-4 rounded-2xl border shadow-soft">
              <div className="text-2xl font-bold text-innova-purple">VIP</div>
              <p className="text-sm text-gray-600">3 courses free</p>
            </li>
            <li className="p-4 rounded-2xl border shadow-soft">
              <div className="text-2xl font-bold text-innova-purple">Seats</div>
              <p className="text-sm text-gray-600">Live availability</p>
            </li>
            <li className="p-4 rounded-2xl border shadow-soft">
              <div className="text-2xl font-bold text-innova-purple">
                Stripe
              </div>
              <p className="text-sm text-gray-600">Secure payments</p>
            </li>
          </ul>
        </div>
        <div className="flex justify-center">
          <Image
            src="/logo.png"
            alt="Innova Academy"
            width={320}
            height={320}
            className="drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
