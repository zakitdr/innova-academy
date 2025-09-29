import { getCourseBySlug } from "@/lib/data";
import EnrollButton from "./EnrollButton";

type UICourse = {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  seatLimit: number;
  seatsTaken: number;
};

interface Props {
  params: { slug: string };
}

export default async function CourseDetail({ params }: Props) {
  const course = (await getCourseBySlug(params.slug)) as UICourse | undefined;
  if (!course) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">Course not found.</div>
    );
  }
  const seatsLeft = course.seatLimit - course.seatsTaken;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <p className="text-gray-600 mt-2">{course.description}</p>
      <div className="mt-6 flex items-center gap-4">
        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm">
          {seatsLeft} seats left
        </span>
        <span className="font-semibold">${course.price / 100}</span>
      </div>
      <div className="mt-8">
        <EnrollButton courseId={course.id} />
      </div>
    </div>
  );
}
