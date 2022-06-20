import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../services/stripe";
import { getSession } from "next-auth/react";

export default async (req: NextApiRequest, res: NextApiResponse) =>  {
  if (req.method === 'POST') {
    const session = await getSession({req})

    const stripeCostumer = await stripe.customers.create({
      // metadata: {}
      email: session.user.email,
      name: session.user.name
    })

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: stripeCostumer.id,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        {price: 'price_1LAJkuBX3kSuBYDmsptMl43L', quantity: 1},
      ], 
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });
    return res.status(200).json({sessionId: stripeCheckoutSession.id})
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}