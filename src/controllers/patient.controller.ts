// src/controllers/patient.controller.ts
import { Request, Response } from "express";
import prisma from "../../prisma/client";

export const registerPatient = async (req: Request, res: Response) => {
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
};

// 수정
export const updatePatient = async (req: Request, res: Response) => {
  const { id } = req.params;
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
    const updatedPatient = await prisma.patientData.update({
      where: { id: id },
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
      where: { id: id },
    });

    return res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
