import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import prisma from "../../prisma/client";
import {
  deletePatient,
  registerPatient,
  updatePatient,
} from "../controllers/patient.controller";

const router = Router();

router.post("/register", registerPatient); // 새등록용 엔드포인트
router.put("/update/:id", updatePatient); // 수정용 엔드포인트
router.delete("/delete/:id", deletePatient); // 삭제용 엔드포인트

export default router;
