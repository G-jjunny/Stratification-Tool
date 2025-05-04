import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  const {
    isReceived,
    patientId,
    patientName,
    isMale,
    institution,
    birthday,
    operationDate,
  } = req.body;

  try {
    const newPatient = await prisma.patientData.create({
      data: {
        isReceived,
        patientId,
        patientName,
        isMale,
        institution,
        birthday,
        operationDate,
      },
    });

    return res.status(201).json({
      message: "Patient data registered successfully",
      patient: newPatient,
    });
  } catch (error) {
    console.error("Error registering patient:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
