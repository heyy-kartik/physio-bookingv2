import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const sql = neon(process.env.DATABASE_URL);

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

export async function insertAppointment(a: Omit<Appointment, "id" | "createdAt" | "status">) {
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  
  await sql`
    INSERT INTO appointments (id, name, phone, email, service, preferredDate, preferredTime, message, consent, status, createdAt)
    VALUES (${id}, ${a.name}, ${a.phone}, ${a.email || null}, ${a.service}, ${a.preferredDate}, ${a.preferredTime}, ${a.message || null}, ${a.consent}, 'new', ${createdAt})
  `;
  
  return { id, createdAt };
}

export async function insertSubscriber(email: string) {
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  
  await sql`
    INSERT INTO subscribers (id, email, createdAt) 
    VALUES (${id}, ${email.trim().toLowerCase()}, ${createdAt})
    ON CONFLICT (email) DO NOTHING
  `;
}
