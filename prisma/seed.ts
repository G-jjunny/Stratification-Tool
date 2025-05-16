import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";
import { users } from "./user";
import prisma from "./client";
import { neoadjFromExcel } from "./neoadjFromExcel";

async function main() {
  // 기존 유저 데이터 삭제
  await prisma.user.deleteMany();
  await prisma.neoY.deleteMany();
  await prisma.neoN.deleteMany();

  // 엑셀 데이터 삽입
  await neoadjFromExcel("NeoY.xlsx", "neoY");
  await neoadjFromExcel("NeoN.xlsx", "neoN");

  // Excel 파일 경로
  // const NeoYPath = path.resolve(process.cwd(), "xlsx", "NeoY.xlsx");
  // // const NeoNPath = path.resolve(__dirname, "./NeoN.xlsx");

  // // 엑셀 파일 읽기
  // const buffer = fs.readFileSync(NeoYPath);
  // const workbook = XLSX.read(buffer, { type: "buffer" });
  // const sheet = workbook.Sheets[workbook.SheetNames[0]];
  // const data = XLSX.utils.sheet_to_json(sheet);

  // // 데이터 삽입
  // for (const row of data) {
  //   const { serial, neoadj, group } = row as {
  //     serial: string;
  //     neoadj: string;
  //     group: string;
  //   };

  //   await prisma.neoY.create({
  //     data: {
  //       serialNum: serial,
  //       Neo: neoadj,
  //       group: group,
  //     },
  //   });
  // }

  // 기본 유저 생성
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10); // 🔐 비밀번호 해싱
    await prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  }

  console.log("데이터가 성공적으로 생성되었습니다.");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
