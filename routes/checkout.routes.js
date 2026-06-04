import express from "express";
import { createpreferenceMP } from "../controllers/checkout.controller.js";

const router = express.Router()

router.post("/", createpreferenceMP)

export default router