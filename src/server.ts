import cors from "@elysiajs/cors"
import swagger from "@elysiajs/swagger"
import { env } from "bun"
import { Elysia } from "elysia"
import { createScheduler } from "./routes/create-scheduler"
import { deleteScheduler } from "./routes/delete-scheduler"
import { getAllScheduler } from "./routes/get-all-scheduler"
import { getSchedulerById } from "./routes/get-scheduler-by-id"
import { updateScheduler } from "./routes/update-scheduler"

export const app = new Elysia()
  .use(
    cors({
      credentials: false,
      allowedHeaders: ["content-type"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      origin: (request): boolean => {
        const origin = request.headers.get("origin")

        if (!origin) {
          return false
        }

        return true
      },
    }),
  )
  .use(
    swagger({
      path: "/docs",
      documentation: {
        info: {
          title: "Scheduler API",
          version: "0.0.1",
        },
      },
    }),
  )
  .use(createScheduler)
  .use(getSchedulerById)
  .use(deleteScheduler)
  .use(getAllScheduler)
  .use(updateScheduler)
  .get("/", async () => {
    return new Response(JSON.stringify({ message: "Olá mundo" }), {
      status: 200,
    })
  })
  .listen(env.PORT || 3333)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
