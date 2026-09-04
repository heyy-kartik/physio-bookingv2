import { neon } from "@neondatabase/serverless";

const DATABASE_URL = "postgresql://neondb_owner:npg_0d5HTyAMtLbR@ep-raspy-fire-a5sbdz7o-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const sql = neon(DATABASE_URL);

async function setupDatabase() {
  try {
    console.log("Creating appointments table...");
    await sql`
      CREATE TABLE IF NOT EXISTS appointments (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        service TEXT NOT NULL,
        preferredDate TEXT NOT NULL,
        preferredTime TEXT NOT NULL,
        message TEXT,
        consent BOOLEAN NOT NULL DEFAULT false,
        status TEXT NOT NULL DEFAULT 'new',
        createdAt TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;

    console.log("Creating subscribers table...");
    await sql`
      CREATE TABLE IF NOT EXISTS subscribers (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        createdAt TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;

    console.log("Database tables created successfully!");
  } catch (error) {
    console.error("Error creating database tables:", error);
    process.exit(1);
  }
}

setupDatabase();