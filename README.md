# Innova Academy
Production-grade scaffold using **Next.js (App Router)**, **Tailwind**, **Prisma**, and **Stripe stubs**.

## Quick Start
1. Install deps
   ```bash
   npm i
   ```
2. Copy env
   ```bash
   cp .env.example .env
   ```
3. Run in-memory demo (no DB) – the site works and enrollment obeys VIP=3 rule:
   ```bash
   npm run dev
   ```
   - The `/api/enroll` route uses `lib/data.ts` JSON file for quick testing.
4. (Optional) Use Prisma + SQLite:
   ```bash
   npx prisma db push
   npm run db:seed
   npm run dev
   ```

## VIP Rule
VIP users can enroll in up to **3 free courses**. The demo API enforces this and seat caps.

## Next Steps
- Wire NextAuth credentials provider to Prisma `User`
- Connect Stripe keys and implement payment intents
- Deploy to Vercel and a managed Postgres (e.g., Neon/Supabase)
"# innova-academy" 
