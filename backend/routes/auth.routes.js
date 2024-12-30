import express from "express";
import {
  getLoggedUser,
  loginController,
  signupController,
} from "../controller/auth.controller.js";

import verifyToken from "../middelware/index.js";



const router = express.Router();

router.post("/signup", signupController);

router.post("/login", loginController);

router.get("/data", verifyToken, getLoggedUser);

export default router;
