import { Request, Response } from "express";
import prisma from "../../prisma/client";
import XLSX from "xlsx";
import fs from "fs";
import path from "path";

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

export const patchDropPatients = async (req: Request, res: Response) => {
  const { ids } = req.body;

  try {
    await prisma.patientData.updateMany({
      where: { patientId: { in: ids } },
      data: { droped: true },
    });

    return res.status(200).json({ message: "Patients marked as dropped" });
  } catch (err) {
    console.error("Drop error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const downloadPatientsExcel = async (req: Request, res: Response) => {
  try {
    const patients = await prisma.patientData.findMany();

    // 엑셀에 담을 데이터 변환
    const excelData = patients.map((p) => ({
      환자ID: p.patientId,
      이름: p.patientName,
      성별: p.isMale,
      생년월일: p.birthday,
      수술일: p.operationDate,
      기관: p.institution ?? "",
      그룹: p.group ?? "",
      드랍여부: p.droped ? "O" : "X",
      등록일: p.createdAt.toISOString().slice(0, 10),
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Patients");

    // 버퍼 생성
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    // 응답 헤더 설정
    res.setHeader("Content-Disposition", "attachment; filename=patients.xlsx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    return res.send(buffer);
  } catch (error) {
    console.error("Excel download error:", error);
    return res.status(500).json({ message: "엑셀 다운로드 실패", error });
  }
};
