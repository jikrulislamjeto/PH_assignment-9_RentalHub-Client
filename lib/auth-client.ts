import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "./auth"

export const authClient = createAuthClient({
  /**
   * The base URL of the auth server.
   * Dynamically resolves to window.location.origin in the browser.
   */
  baseURL:
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
        process.env.BETTER_AUTH_URL ||
        "http://localhost:3000",
  plugins: [inferAdditionalFields<typeof auth>()],
})

export const { signIn, signUp, useSession } = authClient
