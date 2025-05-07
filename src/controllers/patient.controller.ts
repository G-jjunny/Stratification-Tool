import { Request, Response } from "express";
import prisma from "../../prisma/client";

export const getPatientAll = async (req: Request, res: Response) => {
  try {
    const patients = await prisma.patientData.findMany();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: "환자 조회 실패", error: err });
  }
};

export const getPatient = async (req: Request, res: Response) => {
  const { institution } = req.params;

  try {
    const patients = await prisma.patientData.findMany({
      where: {
        institution,
      },
    });

    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: "기관 환자 조회 실패", error: err });
  }
};
