// Express
import express from "express";
const app = express();
import router from "./routes/auth.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

// Dotenv
import dotenv from "dotenv";
dotenv.config();

// Database
import { connectToDatabase } from "./db/connectToDatabase.js";
connectToDatabase();

app.use(
  cors({
    origin: ["https://classycasa.vercel.app"],
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(router);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "/Client/dist")));

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/Client/dist/index.html"));
  res.send("Hello");
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server running on ${port}`));
