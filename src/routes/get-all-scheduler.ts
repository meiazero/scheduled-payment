import { prisma } from "@/db/connection"
import Elysia from "elysia"

export const getAllScheduler = new Elysia().get(
  "/payment/scheduler",
  async ({}) => {
    try {
      const payments = await prisma.paymentSchedule.findMany()

      if (payments.length === 0)
        return new Response(
          JSON.stringify({
            message: "No payment schedule found",
          }),
          { headers: { "Content-Type": "application/json" }, status: 204 },
        )

      return new Response(
        JSON.stringify({
          payments,
        }),
        { headers: { "Content-Type": "application/json" }, status: 200 },
      )
    } catch (error: any) {
      return new Response(
        JSON.stringify({
          error: error.message,
        }),
        { headers: { "Content-Type": "application/json" }, status: 500 },
      )
    }
  },
  {
    detail: {
      summary: "Get all payment scheduler",
      tags: ["Payment"],
    },
  },
)
