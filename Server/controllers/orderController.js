import Order from "../models/orderSchema.js";
import User from "../models/userSchema.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY);

export const couponController = async (req, res) => {
  const { id, couponCode } = req.body;

  if (couponCode == "HAPPYRENT") {
    res.status(200).json({ discount: 10 });
  } else {
    res.status(422).json({ message: "This Coupon code doesn't exist" });
  }
};

export const checkoutController = async (req, res) => {
  const { product, rentalTime, total } = req.body;

  let sessionID = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.title,
            description: `Rental time: ${rentalTime} month`,
          },
          unit_amount: total * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: req.protocol + "://" + req.get("host") + "/UserOrders",
    cancel_url:
      req.protocol +
      "://" +
      req.get("host") +
      `/product/${product.productIndex}`,
  });

  res.status(200).json({ sessionID: sessionID.id });
};

export const postCheckoutController = async (req, res) => {
  const user = await User.findOne({ email: email });
  if (user) {
    const allOrders = user.orders;
    allOrders.push(newOrder);
    const resp = await User.updateOne(
      { email: email },
      {
        $set: {
          orders: allOrders,
        },
      }
    );
    res.send({ message: "Ordered Successfully" });
  } else {
    res.status(422).json({ message: "Please login to order" });
  }
};

export const getOrdersController = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const allOrders = user.orders;
    console.log(allOrders);
    res.json(allOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default checkoutController;
