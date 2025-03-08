import express from "express";
import { PrismaClient } from "@abdul1mannan/db/client";
import { z } from "zod";

const db = new PrismaClient();
const app = express();

app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
  const { token, userId, amount } = req.body;
  const paymentInformation = {
    token,
    userId: userId,
    amount:amount,
  };

  try {
    await db.$transaction([
      db.balance.updateMany({
        where: { userId: paymentInformation.userId },
        data: {
          amount: { increment: Number(paymentInformation.amount) },
        },
      }),
      db.onRampTransaction.updateMany({
        where: { token: paymentInformation.token },
        data: { status: "Completed" },
      }),
    ]);

    res.json({ message: "Captured" });
  } catch (e) {
    console.log("error");
    console.error("Error processing webhook:", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(3002, () => {
  console.log(`Server running on port 3002`);
});
