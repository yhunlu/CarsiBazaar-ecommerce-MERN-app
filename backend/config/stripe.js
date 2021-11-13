import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

export const stripeAPI = new Stripe(process.env.STRIPE_CLIENT_SECRET_KEY);
