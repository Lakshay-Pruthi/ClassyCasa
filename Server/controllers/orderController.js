import Order from "../models/orderSchema.js";
import User from "../models/userSchema.js";

export const orderController = async (req, res) => {
  const { id, email, rentalTime, address, status } = req.body;
  const newOrder = new Order({
    id: id,
    rentalTime: rentalTime,
    address: address,
    status: status,
  });
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

export default orderController;
