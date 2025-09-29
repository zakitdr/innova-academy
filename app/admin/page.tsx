import { getCourses, getStats } from "@/lib/data";

type UICourse = {
  id: string;
  title: string;
  price: number;
  seatLimit: number;
  seatsTaken: number;
  slug?: string;
  description?: string;
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [courses, stats] = await Promise.all([getCourses(), getStats()]);
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid sm:grid-cols-3 gap-4 mt-6">
        <div className="border rounded-2xl p-4">
          <div className="text-gray-600">Users</div>
          <div className="text-2xl font-bold">{stats.users}</div>
        </div>
        <div className="border rounded-2xl p-4">
          <div className="text-gray-600">VIP Users</div>
          <div className="text-2xl font-bold">{stats.vipUsers}</div>
        </div>
        <div className="border rounded-2xl p-4">
          <div className="text-gray-600">Revenue</div>
          <div className="text-2xl font-bold">${stats.revenue / 100}</div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-3">Courses</h2>
      <ul className="space-y-2">
        {courses.map((c: UICourse) => (
          <li
            key={c.id}
            className="border rounded-2xl p-4 flex items-center justify-between"
          >
            <div>
              <div className="font-semibold">{c.title}</div>
              <div className="text-sm text-gray-600">
                {c.seatsTaken}/{c.seatLimit} seats taken
              </div>
            </div>
            <div className="text-sm font-bold">${c.price / 100}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
