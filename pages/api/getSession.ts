// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// retrieving particular session of a user
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
const stripe: Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    // getting session id from request
    const sessionId = req.query.session_id as string;

    // retrieve kr rhay hn of all the item of specific session (LastLineItems)
    const session = await stripe.checkout.sessions.listLineItems(sessionId);

    res.status(200).json({
        session,
    });
}