import Link from "next/link";
import { getCourses } from "@/lib/data";

type UICourse = {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  seatLimit: number;
  seatsTaken: number;
};

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const courses: UICourse[] = await getCourses();
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Courses</h1>
          <p className="text-gray-600">Seats update in real time.</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c: UICourse) => {
          const left = c.seatLimit - c.seatsTaken;
          return (
            <div
              key={c.id}
              className="border rounded-2xl p-4 shadow-soft flex flex-col"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">{c.title}</h2>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    left <= 0
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {left} left
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {c.description}
              </p>
              <div className="mt-auto pt-4 flex items-center justify-between">
                <span className="font-bold">${c.price / 100}</span>
                <Link className="btn btn-primary" href={`/courses/${c.slug}`}>
                  View
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
