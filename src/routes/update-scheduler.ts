import { prisma } from "@/db/connection"
import Elysia, { t } from "elysia"

export const updateScheduler = new Elysia().patch(
  "/payment/scheduler/:id",
  async ({ body, params }) => {
    const { amount, payment_date, status } = body
    const { id } = params

    try {
      const payment = await prisma.paymentSchedule.findUnique({
        where: {
          id,
        },
      })

      if (payment!.status !== "paid") {
        const updatePayment = await prisma.paymentSchedule.update({
          where: {
            id,
          },
          data: {
            amount,
            payment_date,
            status,
          },
        })

        return new Response(
          JSON.stringify({
            message: "Payment schedule updated",
            payment_id: updatePayment.id,
          }),
          { headers: { "Content-Type": "application/json" }, status: 200 },
        )
      }

      return new Response(
        JSON.stringify({
          message: "The payment has been paid and cannot be updated.",
        }),
        { headers: { "Content-Type": "application/json" }, status: 409 },
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
    body: t.Object({
      amount: t.Optional(t.Number()),
      payment_date: t.Optional(t.String()),
      status: t.Optional(t.String()),
    }),
    detail: {
      summary: "Update payment scheduler",
      tags: ["Payment"],
    },
  },
)
