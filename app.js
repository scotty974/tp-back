import express from "express";
import connectDB from "./src/middleware/db.js";
import user from "./src/route/user.js";
import product from "./src/route/products.js";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: ["*"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.use("/api", user);
app.use("/api", product);
export default app;
