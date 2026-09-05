import { Pool } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// Use connection pooling for better reliability
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

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
  
  const client = await pool.connect();
  
  try {
    const result = await client.query(
      `INSERT INTO appointments (id, name, phone, email, service, preferredDate, preferredTime, message, consent, status, createdAt)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'new', $10)
       RETURNING id`,
      [id, a.name, a.phone, a.email || null, a.service, a.preferredDate, a.preferredTime, a.message || null, a.consent, createdAt]
    );
    
    return { id, createdAt };
  } finally {
    client.release();
  }
}

export async function insertSubscriber(email: string) {
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  
  const client = await pool.connect();
  
  try {
    await client.query(
      `INSERT INTO subscribers (id, email, createdAt) 
       VALUES ($1, $2, $3)
       ON CONFLICT (email) DO NOTHING`,
      [id, email.trim().toLowerCase(), createdAt]
    );
  } finally {
    client.release();
  }
}

export async function testConnection() {
  const client = await pool.connect();
  
  try {
    const result = await client.query('SELECT 1 as test');
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  } finally {
    client.release();
  }
}