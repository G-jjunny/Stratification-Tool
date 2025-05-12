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

export const dropPatients = async (req: Request, res: Response) => {
  const { ids } = req.body;

  try {
    await prisma.patientData.updateMany({
      where: { id: { in: ids } },
      data: { droped: true },
    });

    return res.status(200).json({ message: "Saved" });
  } catch (err) {
    console.error("Drop error:", err);
    return res.status(500).json({ message: "서버 오류" });
  }
};
