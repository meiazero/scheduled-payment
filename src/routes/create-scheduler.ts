import { prisma } from "@/db/connection"
import Elysia, { t } from "elysia"

export const createScheduler = new Elysia().post(
  "/payment/scheduler",
  async ({ body }) => {
    const { amount, payment_date } = body

    try {
      const payment = await prisma.paymentSchedule.create({
        data: {
          amount,
          payment_date,
        },
      })

      return new Response(
        JSON.stringify({
          payment_id: payment.id,
        }),
        { headers: { "Content-Type": "application/json" }, status: 201 },
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
    body: t.Object({
      amount: t.Number(),
      payment_date: t.String(),
    }),
    detail: {
      summary: "Create a payment schedule",
      tags: ["Payment"],
    },
  },
)
