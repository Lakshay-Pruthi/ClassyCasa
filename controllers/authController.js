import Order from "../models/orderSchema.js";
import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const authenticateController = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const id = decoded._id;
      const user = await User.findOne({ _id: id });
      res.send(user);
    } else {
      res.send(404).json({ message: "No token found" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const signUpController = async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(422).json({ error: "This email already exists" });
    return;
  }

  const hash = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hash, phone, address });

  user.save().then(async () => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    console.log("Data uploaded successfully");
  });
  res.send(user);
};

export const logInController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  const dbPass = user?.password;
  const val = dbPass ? await bcrypt.compare(password, dbPass) : false;
  if (user && val) {
    const token = await user.generateAuthToken();
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 3000000),
      httpOnly: true,
    });

    res.send({ message: "Login Successfull" });
  } else {
    res.status(422).json({ error: "User does not exists" });
  }
  console.log(req.cookies.jwt);
};

export const updateUserDetailController = async (req, res) => {
  const { name, oldEmail, newEmail, phone, address } = req.body;
  const user = await User.findOne({ email: oldEmail });
  console.log("This is user", user);
  if (user) {
    const r = await User.updateOne(
      { email: oldEmail },
      {
        $set: {
          name: name,
          email: newEmail,
          phone: phone,
          address: address,
        },
      }
    );
    const token = await user.generateAuthToken();
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 3000000),
      httpOnly: true,
    });
    res.send({ message: "Account updated successfully" });
  } else {
    res.status(422).json({ error: "User does not exists" });
  }
};

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
    res.status(422).json({ message: "Please login before ordering" });
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

export default logInController;
