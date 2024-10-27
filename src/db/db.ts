import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const MAX_RETRIES = 5;
const RETRY_DELAY_BASE_MS = 1000; // Base delay in milliseconds for exponential backoff

// Helper function to ensure environment variables are present
const getEnvVariable = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`${key} is not set in the environment variables`);
  }
  return value;
};

// Validate and get the DATABASE_URL environment variable
const databaseUrl = getEnvVariable('DATABASE_URL');

// Automated reconnection logic with retries and exponential backoff
const createPoolWithRetries = async (retries: number = MAX_RETRIES): Promise<Pool> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const pool = new Pool({
        connectionString: databaseUrl,
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
      });

      // Listen to pool events to track connection and pool state
      monitorPool(pool);

      // Test the connection by acquiring a client
      await pool.query('SELECT 1');
      console.log(`Connected to the database on attempt ${attempt}`);
      return pool; // Return the pool if the connection is successful
    } catch (error) {
      console.error(`Database connection attempt ${attempt} failed:`, error);
      if (attempt === retries) {
        console.error('Max retries reached. Unable to connect to the database.');
        process.exit(-1);
      }
      const delay = RETRY_DELAY_BASE_MS * Math.pow(2, attempt - 1); // Exponential backoff
      console.log(`Retrying to connect in ${delay}ms...`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
  throw new Error('Unexpected error in connection retry logic');
};

// Monitoring system for tracking pool usage
const monitorPool = (pool: Pool) => {
  const logPoolStatus = () => {
    console.log('Pool Status:', {
      totalClients: pool.totalCount,   // Total clients in the pool
      idleClients: pool.idleCount,     // Clients currently idle
      waitingRequests: pool.waitingCount, // Clients waiting for a connection
    });
  };

  // Log status on specific pool events
  pool.on('connect', () => {
    console.log('New client connected to the database');
    logPoolStatus();
  });

  pool.on('acquire', () => {
    console.log('Client acquired from the pool');
    logPoolStatus();
  });

  pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1); // Optional: Exit the process on database connection error
  });

  // Periodically log the pool status (e.g., every 30 seconds)
  setInterval(logPoolStatus, 30000); // Adjust interval as necessary
};

// Gracefully close pool on application termination
const shutdownPool = async (pool: Pool) => {
  try {
    await pool.end();
    console.log('Database connection pool has been closed.');
  } catch (error) {
    console.error('Error while closing the database connection pool:', error);
  }
};

// Main function to initialize the pool with retries and monitoring
const initializeDatabase = async () => {
  const pool = await createPoolWithRetries();
  process.on('SIGINT', () => shutdownPool(pool)); // Handle Ctrl+C
  process.on('SIGTERM', () => shutdownPool(pool)); // Handle termination signals

  return drizzle(pool);
};

export const db = await initializeDatabase();
