import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, "appointments.db");
const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS appointments (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    service TEXT NOT NULL,
    preferredDate TEXT NOT NULL,
    preferredTime TEXT NOT NULL,
    message TEXT,
    consent INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'new',
    createdAt TEXT NOT NULL
  )
`);

export type Appointment = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  consent: boolean;
  status: string;
  createdAt: string;
};

export function insertAppointment(a: Omit<Appointment, "id" | "createdAt" | "status">) {
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO appointments (id, name, phone, email, service, preferredDate, preferredTime, message, consent, status, createdAt)
    VALUES (@id, @name, @phone, @email, @service, @preferredDate, @preferredTime, @message, @consent, 'new', @createdAt)
  `);
  stmt.run({
    id,
    name: a.name,
    phone: a.phone,
    email: a.email ?? null,
    service: a.service,
    preferredDate: a.preferredDate,
    preferredTime: a.preferredTime,
    message: a.message ?? null,
    consent: a.consent ? 1 : 0,
    createdAt,
  });
  return { id, createdAt };
}

export default db;
