// src/controllers/patient.controller.ts
import { Request, Response } from "express";
import prisma from "../../prisma/client";

export const registerPatient = async (req: Request, res: Response) => {
  const {
    isReceived,
    patientId,
    patientName,
    isMale,
    group,
    droped,
    institution,
    birthday,
    operationDate,
    serialNum,
  } = req.body;

  try {
    const newPatient = await prisma.patientData.create({
      data: {
        isReceived,
        patientId,
        patientName,
        group,
        isMale,
        droped,
        institution,
        birthday,
        operationDate,
        serialNum,
      },
    });

    // 2. 그룹 테이블에서 serialNum 기준으로 used 업데이트
    if (isReceived === "Y") {
      await prisma.neoY.updateMany({
        where: { serialNum, used: false },
        data: { used: true },
      });
    } else if (isReceived === "N") {
      await prisma.neoN.updateMany({
        where: { serialNum, used: false },
        data: { used: true },
      });
    }

    return res.status(201).json({
      message: "Patient data registered successfully",
      patient: newPatient,
    });
  } catch (error) {
    console.error("Error registering patient:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// 수정
export const updatePatient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    isReceived,
    patientId,
    patientName,
    isMale,
    droped,
    group,
    institution,
    birthday,
    operationDate,
    serialNum,
  } = req.body;

  try {
    const updatedPatient = await prisma.patientData.update({
      where: { patientId: id },
      data: {
        isReceived,
        patientId,
        patientName,
        isMale,
        droped,
        group,
        institution,
        birthday,
        operationDate,
        serialNum,
      },
    });

    return res.status(200).json({
      message: "Patient data updated successfully",
      patient: updatedPatient,
    });
  } catch (error) {
    console.error("Error updating patient:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// 삭제
export const deletePatient = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.patientData.delete({
      where: { patientId: id },
    });

    return res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
