import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";
import prisma from "./client";

export const neoadjFromExcel = async (
  fileName: string,
  model: "neoY" | "neoN"
) => {
  const NeoYPath = path.resolve(process.cwd(), "xlsx", fileName);
  // const NeoNPath = path.resolve(__dirname, "./NeoN.xlsx");

  // 엑셀 파일 읽기
  const buffer = fs.readFileSync(NeoYPath);
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet);

  // 데이터 삽입
  for (const row of data) {
    const { serial, neoadj, group } = row as {
      serial: string;
      neoadj: string;
      group: string;
    };
    const record = {
      serialNum: serial,
      Neo: neoadj,
      group: group,
    };

    if (model === "neoY") {
      await prisma.neoY.create({ data: record });
    } else if (model === "neoN") {
      await prisma.neoN.create({ data: record });
    }
  }

  console.log(`✅ ${model} 테이블에 데이터가 성공적으로 삽입되었습니다.`);
};
