import express from "express";
import { createLog, getLogs } from "../controllers/logsController";
const router = express.Router();

router.post("/refill-product-stock/:id", createLog);
router.get("/pharmacy-logs/:id", getLogs);


export default router;