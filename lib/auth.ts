import dns from "node:dns";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

// Fix for Node.js on Windows / certain ISPs where local router DNS fails on MongoDB SRV records (querySrv ECONNREFUSED)
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch {
  // Fallback gracefully if custom DNS resolution is restricted
}

const client = new MongoClient(process.env.BETTER_AUTH_DB_URI as string);
const db = client.db("rentalhubdb");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  user: {
    additionalFields: {
      role: {
        type: ["Customer", "Owner", "Admin"],
        defaultValue: "Customer",
        input: true,
      },
    },
  },
  socialProviders: process.env.GOOGLE_CLIENT_ID
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
      }
    : undefined,
  database: mongodbAdapter(db, {
    client,
  }),
});
