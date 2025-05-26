import { Router } from "express";
import {
  getAllSeats,
  updateSeatStatus,
  reserveSeat,
} from "../controllers/app.controller.js";

const router = Router();

router.post("/get-seats", getAllSeats);
router.post("/get-ticket", updateSeatStatus);
router.post("/update-seat-status", updateSeatStatus);
router.post("/reserve-seat", reserveSeat);

export default router;
