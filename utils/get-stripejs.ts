import { loadStripe, Stripe } from "@stripe/stripe-js";

// https://vercel.com/guides/getting-started-with-nextjs-typescript-stripe#loading-stripe.js

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
    // if there is not stripe promise it will load publishable key'
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    }
    // but if promise is there it will be returned
    return stripePromise;
};

export default getStripe;