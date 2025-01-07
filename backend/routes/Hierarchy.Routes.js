import { Router } from "express";
import { getDealer, getSubDealer, getSuperDealer } from "../controller/Hierarchy.Order.js";

const router = Router();

router.get("/superdealers", getSuperDealer);

router.get("/dealers/:id", getDealer );

router.get("/subdealers/:id", getSubDealer );

export default router;
