import './envConfig.ts'
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dialect: "postgresql",
    out: "./src/db/migrations",
    schema: "./src/db/schema",
    strict: true,
    verbose: true,
    dbCredentials: {
        url: process.env.DATABASE_URL!,
        ssl: false
    }
});