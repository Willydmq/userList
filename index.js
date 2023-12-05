import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import userRoutes from "./routes/users.js";

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());
server.use("/", userRoutes);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

server.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "true");
  res.send("Api is running...");
});
