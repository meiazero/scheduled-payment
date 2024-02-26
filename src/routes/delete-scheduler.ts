import { prisma } from "@/db/connection"
import Elysia, { t } from "elysia"

export const deleteScheduler = new Elysia().delete(
  "/payment/scheduler/:id",
  async ({ params }) => {
    const { id } = params

    try {
      const payment = await prisma.paymentSchedule.findUnique({
        where: {
          id,
        },
      })

      if (payment!.status !== "paid") {
        const deletePayment = await prisma.paymentSchedule.delete({
          where: {
            id,
          },
        })

        return new Response(
          JSON.stringify({
            message: "Payment schedule deleted",
            payment_id: deletePayment.id,
          }),
          { headers: { "Content-Type": "application/json" }, status: 200 },
        )
      }

      return new Response(
        JSON.stringify({
          message: "The payment has been paid and cannot be deleted.",
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

    detail: {
      summary: "Delete payment scheduler",
      tags: ["Payment"],
    },
  },
)
