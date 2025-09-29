import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@innova.com";
  const password = "Admin123!"; // you can change this
  const passwordHash = await bcrypt.hash(password, 10);

  // create admin if not exists
  const existing = await prisma.user.findUnique({ where: { email } });
  if (!existing) {
    await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: "admin",
        isVIP: true,
      },
    });
    console.log("✅ Admin user created:", email, password);
  } else {
    console.log("ℹ️ Admin already exists:", email);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
