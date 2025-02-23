import express from "express";
import {
  approveSeller,
  getSeller,
  getsellerRequest,
  getSingleSeller,
  removeSeller,
  sellerRegister,
  updateSeller,
} from "../controller/seller.controller.js";

const router = express.Router();

router.get("/getsellerdata", getSeller);

router.post("/sellerregister", sellerRegister);

router.get("/seller/:id", getSingleSeller);

//Admin Page

router.get("/getsellerrequest", getsellerRequest);

router.put("/approveseller/:id", approveSeller);

router.put("/updateseller/:id", updateSeller);

router.delete("/removesellerregister/:id", removeSeller);

export default router;
