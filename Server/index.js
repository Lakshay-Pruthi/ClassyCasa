// Express
import express from "express";
const app = express();
import authenticationRoutes from "./routes/auth.js";
import orderRoutes from "./routes/order.js";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import rootDir from "./utils/path.js";
import session from "express-session";
import connectMongoDBSession from "connect-mongodb-session";
// const mongoDBStore = connectMongoDBSession(session);

// Dotenv
import dotenv from "dotenv";
dotenv.config();

// Database
import { connectToDatabase } from "./utils/connectToDatabase.js";
connectToDatabase();

// const store = new mongoDBStore({
//   uri: process.env.MONGO,
//   collection: "sessions",
// });

app.use(cors());
app.use(cookieParser());
app.use(express.json());
// app.use(
//   session({
//     secret: process.env.SESSION_KEY,
//     resave: false,
//     saveUninitialized: false,
//     store: store,
//   })
// );
app.use(authenticationRoutes);
app.use(orderRoutes);

app.use(express.static(path.join(rootDir, "..", "..", "Client", "dist")));

app.use("/api/wakeServerOne", (req, res) => {
  console.log("Request recueved from server two");

  setTimeout(() => {
    const res = fetch("https://classycasarequestsender/api/wakeServerTwo");
  }, 300000);
  console.log("I am also working");

  res.status(200).json({ message: "Hi!!" });
});

app.use("/", (req, res) => {
  res.sendFile(path.join(rootDir, "..", "..", "Client", "dist", "index.html"));
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server running on ${port}`));
