const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
const KEY = process.env.STRIPE_SECRET_KEY_MY;
const stripe = require("stripe")(KEY);
// console.log(KEY);
// console.log(stripe.paymentIntents.create);
router.post("/payment", async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create(
    {
      amount: req.body.amount,
      description: req.body.tokenId,
      currency: "INR",
      payment_method_types: ["card"],
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
