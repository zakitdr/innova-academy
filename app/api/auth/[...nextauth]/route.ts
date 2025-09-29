import { handlers } from "../../../../auth";

// Force Node runtime so bcrypt/Prisma are OK here
export const runtime = "nodejs";

// Re-export the actual handlers
export const { GET, POST } = handlers;
