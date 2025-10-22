import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'mysql', // 'mysql' | 'sqlite' | 'turso'
  schema: './src/lib/database/schema.ts',
  out: './src/lib/database/migrations',
  dbCredentials: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
});
