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

// export const downloadPatientsExcel = async (req: Request, res: Response) => {
//   try {
//     const patients = await prisma.patientData.findMany();

//     // 엑셀에 담을 데이터 변환 (데이터 타입 명시적 처리)
//     const excelData = patients.map((p) => ({
//       환자ID: p.patientId || "",
//       이름: p.patientName || "",
//       성별: p.isMale ? "남" : "여",
//       생년월일: p.birthday
//         ? new Date(p.birthday).toLocaleDateString("ko-KR")
//         : "",
//       수술일: p.operationDate
//         ? new Date(p.operationDate).toLocaleDateString("ko-KR")
//         : "",
//       기관: p.institution || "",
//       그룹: p.group || "",
//       드랍여부: p.droped ? "O" : "X",
//       등록일: p.createdAt
//         ? new Date(p.createdAt).toLocaleDateString("ko-KR")
//         : "",
//     }));

//     // 워크시트 생성 시 타입 지정
//     const worksheet = XLSX.utils.json_to_sheet(excelData);

//     // 워크북 생성 및 시트 추가
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Patients");

//     // 엑셀 파일 쓰기 옵션 명시적 지정
//     const excelBuffer = XLSX.write(workbook, {
//       type: "buffer",
//       bookType: "xlsx",
//       compression: true, // 압축 옵션 추가
//     });

//     // 응답 헤더 설정 (더 명확하게)
//     res.setHeader("Content-Disposition", "attachment; filename=patients.xlsx");
//     res.setHeader(
//       "Content-Type",
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//     );
//     res.setHeader("Content-Length", excelBuffer.length);
//     res.setHeader("Cache-Control", "no-cache");

//     // 버퍼 직접 전송
//     return res.send(excelBuffer);
//   } catch (error) {
//     console.error("Excel download error:", error);
//     return res.status(500).json({ message: "엑셀 다운로드 실패", error });
//   }
// };

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
