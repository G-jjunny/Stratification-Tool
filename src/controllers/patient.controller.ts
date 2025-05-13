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

    // for (const id of ids) {
    //   const patient = await prisma.patientData.findUnique({
    //     where: { patientId: id },
    //     select: { droped: true },
    //   });

    //   if (patient) {
    //     await prisma.patientData.update({
    //       where: { patientId: id },
    //       data: { droped: !patient.droped },
    //     });
    //   }
    // }

    return res.status(200).json({ message: "Patients marked as dropped" });
  } catch (err) {
    console.error("Drop error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const downloadPatientsExcel = async (req: Request, res: Response) => {
  try {
    const patients = await prisma.patientData.findMany();

    const excelData = patients.map((p) => ({
      환자ID: p.patientId || "",
      이름: p.patientName || "",
      성별: p.isMale ? "남" : "여",
      생년월일: p.birthday
        ? new Date(p.birthday).toLocaleDateString("ko-KR")
        : "",
      수술일: p.operationDate
        ? new Date(p.operationDate).toLocaleDateString("ko-KR")
        : "",
      기관: p.institution || "",
      그룹: p.group || "",
      드랍여부: p.droped ? "O" : "X",
      등록일: p.createdAt
        ? new Date(p.createdAt).toLocaleDateString("ko-KR")
        : "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Patients");

    // 엑셀 파일을 binary 문자열로 생성
    const binaryExcel = XLSX.write(workbook, {
      type: "binary",
      bookType: "xlsx",
    });

    // binary 문자열을 버퍼로 변환
    const buffer = Buffer.from(binaryExcel, "binary");

    // 응답 헤더 설정
    res.setHeader("Content-Disposition", "attachment; filename=patients.xlsx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Length", buffer.length);
    res.setHeader("Cache-Control", "no-cache");

    // 버퍼 전송
    return res.end(buffer);
  } catch (error) {
    console.error("Excel download error:", error);
    return res.status(500).json({ message: "엑셀 다운로드 실패", error });
  }
};
