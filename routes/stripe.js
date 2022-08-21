import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import express from "express";
const router = express.Router();

// sk_test_51JAlvVHL2e42QB3ooEu0TCDBe7JztUxpQ1IqFmI9HrfrIF7lplFXbEFzmmijyVq9hrsdGqTxVCe3ugOLg7YKk2Yo00wG7KxbPQ
// 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
const stripe = require('stripe')('sk_test_51LYvvbHSfpRXz0HoRhWQOLP1Jfq6YMZf9kZlRhj184vG45N7yGD4ocetc4nYn8CIUDZeAnx7Jiivh4oJfrbSVkRR00alS2vIn6');

export const payOnlineProducts = async (req, res) => {
    try {
        const { email, firstName, lastName, phoneNumber, amount } = req.body
        console.log("req.body", req.body)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'LBP',
            // Verify your integration in this guide by including this parameter
            metadata: { integration_check: 'accept_a_payment' },
            receipt_email: email,

        });

        return res.json({ 'client_secret': paymentIntent['client_secret'] });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// router.post('/pay', async (req, res) => {

//     const {email, firstName, lastName, phoneNumber, amount} = req.body
// console.log("req.body", req.body)
//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: amount*100,
//         currency: 'LBP',
//         // Verify your integration in this guide by including this parameter
//         metadata: {integration_check: 'accept_a_payment'},
//         receipt_email: email,

//       });

//       res.json({'client_secret': paymentIntent['client_secret']})
// })


// export default router;