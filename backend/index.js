import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import verifyToken from "./middelware/index.js";
import { ConnectDb } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js";
import buyerRoutes from "./routes/buyer.routes.js";
import sellerRoutes from "./routes/seller.routes.js";

dotenv.config();

app.use(cors());
app.use(express.json());

const __dirname = path.resolve();

app.use("/auth", authRoutes);
app.use("/api", buyerRoutes);
app.use("/api", sellerRoutes);



// // delete route for signup
// app.delete("/removeid/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const removeUser = await SignupModel.findByIdAndDelete(id);
//     res.status(201).json(removeUser);
//   } catch (error) {
//     console.error("Signup error:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// Start the server
app.listen(8000, () => {
  console.log("Server running on port 8000");
  ConnectDb();
});
