import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema";

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://74b017d6a8db709aaeb335032f78ad5b1e35f82ebb2137ddc59744c7ea18406b:sk_AtedbOlZMmSa-TTeiqs-y@db.prisma.io:5432/postgres?sslmode=require",
});

export const db = drizzle(pool, { schema });
