# JERA Backend

This folder is a scaffold for the journal admin API.

## Stack
- Node.js
- Express
- Prisma ORM
- Supabase for auth and database access patterns
- Cloudinary for PDF storage

## Planned endpoints
- `GET /api/public/volumes`
- `POST /api/auth/admin/login`
- `GET /api/auth/admin/session`
- `POST /api/admin/volumes`
- `POST /api/admin/issues`
- `POST /api/admin/papers`

## Request Flow
- Admin login uses username/password from env variables and returns a JWT token.
- All `/api/admin/*` routes require an `Authorization: Bearer <token>` header.
- Volume and issue requests use JSON bodies.
- Paper uploads use `multipart/form-data` with a `pdfFile` field.
- PDFs are limited to 5 MB and are uploaded to Cloudinary before being stored through Prisma.
- The database can be hosted on Supabase PostgreSQL or any Postgres provider compatible with Prisma.

## Next setup steps
1. Install dependencies with `npm install`.
2. Fill in `.env` from `.env.example`.
3. Run `npx prisma generate` after connecting a PostgreSQL database.
4. Add Supabase and Cloudinary credentials.
