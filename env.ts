import { z } from "zod"

export const envVariables = z.object({
  PORT: z.string(),
  DATABASE_URL: z.string(),
})

envVariables.parse(process.env)

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
