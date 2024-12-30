import express from "express";
import {
  approveBuyer,
  buyerRegister,
  getBuyer,
  getbuyerRequest,
  removeBuyer,
  updateBuyer,
} from "../controller/buyer.controller.js";

const router = express.Router();

router.get("/getbuyerdata", getBuyer);

router.post("/buyerregister", buyerRegister);

//Admin Page

router.get("/getbuyerrequest", getbuyerRequest);

router.put("/approvebuyer/:id", approveBuyer);

router.delete("/removebuyerregister/:id", removeBuyer);

router.put("/updatedata/:id", updateBuyer );

export default router;
