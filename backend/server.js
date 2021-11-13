import express from "express";
import dotenv from "dotenv";
import colors from "colors";

import cors from "cors";
import Stripe from "stripe";
import { v4 as uuid } from "uuid";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { createCheckoutSession } from "./api/checkout.js";

dotenv.config();

connectDB();

const app = express();

const stripe = new Stripe(process.env.STRIPE_CLIENT_SECRET_KEY);

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// app.post("/create-checkout-session", createCheckoutSession);

app.post("/api/config/stripe", async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { order, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const idempotencyKey = uuid();
    const charge = await stripe.charges.create(
      {
        amount: order.totalPrice * 100,
        currency: "TRY",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey,
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
