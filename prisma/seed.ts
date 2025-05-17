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
