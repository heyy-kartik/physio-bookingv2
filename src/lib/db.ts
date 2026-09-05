import { neon, neonConfig } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// Configure Neon with longer timeout and connection settings
neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.DATABASE_URL, {
  // Increase timeout to 30 seconds
  fetchOptions: {
    cache: 'no-store',
  }
});

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
  
  // Retry logic for database operations
  const maxRetries = 3;
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await sql`
        INSERT INTO appointments (id, name, phone, email, service, preferredDate, preferredTime, message, consent, status, createdAt)
        VALUES (${id}, ${a.name}, ${a.phone}, ${a.email || null}, ${a.service}, ${a.preferredDate}, ${a.preferredTime}, ${a.message || null}, ${a.consent}, 'new', ${createdAt})
      `;
      
      return { id, createdAt };
    } catch (error) {
      console.log(`Database attempt ${attempt}/${maxRetries} failed:`, error);
      lastError = error;
      
      if (attempt < maxRetries) {
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, attempt * 1000));
      }
    }
  }
  
  throw lastError;
}

export async function insertSubscriber(email: string) {
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  
  // Retry logic for database operations
  const maxRetries = 3;
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await sql`
        INSERT INTO subscribers (id, email, createdAt) 
        VALUES (${id}, ${email.trim().toLowerCase()}, ${createdAt})
        ON CONFLICT (email) DO NOTHING
      `;
      return;
    } catch (error) {
      console.log(`Subscriber insert attempt ${attempt}/${maxRetries} failed:`, error);
      lastError = error;
      
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, attempt * 1000));
      }
    }
  }
  
  throw lastError;
}
// Test database connection
export async function testConnection() {
  try {
    const result = await sql`SELECT 1 as test`;
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}
88888888888888888888888888888888888888888888888888888888888888888888