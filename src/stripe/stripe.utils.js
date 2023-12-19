import { loadStripe } from "@stripe/stripe-js";

//hide publishabale key in .env file, and add .env to the gitignore file so that the .env file containing the key does not get pushed into github repo. Key will only exist in our developer environment

// import into index.js
export const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);