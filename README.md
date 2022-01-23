## Nextjs - Tailwind - Prisma starter project

Starter project originally implemented by [Theo](https://github.com/TheoBr) using the following stack:

- Next.js with Typescript
- Tailwind CSS: styling
- Prisma.io: Typescript ORM for the DB
- tRPC: for defining and consuming APIs
- PlanetScale: MySQL serverless database

Setup

1. Clone repo
2. `yarn`
3. Create `.env` with `DATABASE_URL` and `SHADOW_URL`
4. Initialize database - `yarn prisma migrate dev`
5. Initialize base data set - `yarn backfill`
6. Run dev server `yarn dev`
