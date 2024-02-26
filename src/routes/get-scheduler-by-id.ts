import { prisma } from "@/db/connection"
import Elysia, { t } from "elysia"

export const getSchedulerById = new Elysia().get(
  "/payment/scheduler/:id",
  async ({ params }) => {
    const { id } = params

    try {
      const payment = await prisma.paymentSchedule.findUnique({
        where: {
          id: id,
        },
      })

      if (!payment)
        return new Response(
          JSON.stringify({
            message: "Payment schedule not found",
          }),
          { headers: { "Content-Type": "application/json" }, status: 404 },
        )

      return new Response(
        JSON.stringify({
          payment,
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
    params: t.Object({
      id: t.String(),
    }),
    detail: {
      summary: "Get a payment schedule by ID",
      tags: ["Payment"],
    },
  },
)
