// For quick demo, we simulate a DB with a JSON file. Replace with Prisma calls.
import fs from "fs/promises";
import path from "path";

const dbPath = path.join(process.cwd(), "tmp-db.json");

async function init() {
  try {
    await fs.access(dbPath);
  } catch {
    await fs.writeFile(dbPath, JSON.stringify({
      users: [],
      courses: [
        { id: "c1", slug: "javascript-foundations", title: "JavaScript Foundations", description: "Start coding modern JavaScript.", price: 9900, seatLimit: 25, seatsTaken: 12 },
        { id: "c2", slug: "react-advanced", title: "React Advanced", description: "Hooks, patterns, performance.", price: 12900, seatLimit: 20, seatsTaken: 19 },
        { id: "c3", slug: "ui-ux-design", title: "UI/UX Design", description: "Design delightful interfaces.", price: 10900, seatLimit: 18, seatsTaken: 5 },
      ],
      enrollments: [],
      payments: []
    }, null, 2));
  }
}

export async function getCourses() {
  await init();
  const json = JSON.parse(await fs.readFile(dbPath, "utf-8"));
  return json.courses;
}

export async function getCourseBySlug(slug: string) {
  const courses = await getCourses();
  return courses.find((c:any)=>c.slug===slug);
}

export async function enroll({ userId = "demo-user", courseId, isVIP = true }: { userId?: string, courseId: string, isVIP?: boolean }) {
  await init();
  const json = JSON.parse(await fs.readFile(dbPath, "utf-8"));
  const user = json.users.find((u:any)=>u.id===userId) ?? { id: userId, email: "demo@innova.ac", isVIP, vipFreeUsed: 0 };
  if (!json.users.find((u:any)=>u.id===userId)) json.users.push(user);

  const course = json.courses.find((c:any)=>c.id===courseId);
  if (!course) throw new Error("Course not found");

  // seat check
  if (course.seatsTaken >= course.seatLimit) {
    return { ok: false, error: "Course is full" };
  }

  let isFree = false;
  if (user.isVIP && user.vipFreeUsed < 3) {
    isFree = true;
  }

  if (!isFree) {
    // Stripe flow would go here. For demo just mark as paid.
    json.payments.push({ id: "p"+Date.now(), userId: user.id, courseId, amount: course.price, currency: "USD", status: "succeeded" });
  } else {
    user.vipFreeUsed += 1;
  }

  course.seatsTaken += 1;
  json.enrollments.push({ id: "e"+Date.now(), userId: user.id, courseId, status: "enrolled", isFree });
  await fs.writeFile(dbPath, JSON.stringify(json, null, 2));
  return { ok: true, isFree };
}

export async function getStats() {
  await init();
  const json = JSON.parse(await fs.readFile(dbPath, "utf-8"));
  const users = json.users.length;
  const vipUsers = json.users.filter((u:any)=>u.isVIP).length;
  const revenue = json.payments.reduce((s:any,p:any)=>s+p.amount,0);
  return { users, vipUsers, revenue };
}
