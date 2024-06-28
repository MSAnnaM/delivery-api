import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/userRoutes.js";
import roleRouter from "./routes/roleRoutes.js";
import productRouter from "./routes/productRoutes.js";
import clientRouter from "./routes/clientRoutes.js";


const app = express();
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));

app.use("/api/users", userRouter);
app.use("/api/roles", roleRouter);
app.use("/api/product", productRouter);
app.use("/api/client", clientRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});



export default app;