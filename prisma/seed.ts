import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // 기존 유저 데이터 삭제
  await prisma.user.deleteMany();

  // 사용자 목록 생성
  const users = [
    {
      institution: "SMC",
      accountId: "admin",
      password: "smc12345",
      role: Role.ADMIN,
    },
    {
      institution: "SMC",
      accountId: "smc1",
      password: "smc2472",
      role: Role.USER,
    },
    {
      institution: "SMC",
      accountId: "smc2",
      password: "smc6587",
      role: Role.USER,
    },
    {
      institution: "SMC",
      accountId: "smc3",
      password: "smc0369",
      role: Role.USER,
    },
    {
      institution: "NCCE",
      accountId: "ncce1",
      password: "ncce483",
      role: Role.USER,
    },
    {
      institution: "NCCE",
      accountId: "ncce2",
      password: "ncce990",
      role: Role.USER,
    },
    {
      institution: "NCCE",
      accountId: "ncce3",
      password: "ncce481",
      role: Role.USER,
    },
    {
      institution: "Juntendo",
      accountId: "juntendo1",
      password: "juntendo474",
      role: Role.USER,
    },
    {
      institution: "Juntendo",
      accountId: "juntendo2",
      password: "juntendo368",
      role: Role.USER,
    },
    {
      institution: "Juntendo",
      accountId: "juntendo3",
      password: "juntendo482",
      role: Role.USER,
    },
    {
      institution: "Okayama",
      accountId: "okayama1",
      password: "okayama832",
      role: Role.USER,
    },
    {
      institution: "Okayama",
      accountId: "okayama2",
      password: "okayama809",
      role: Role.USER,
    },
    {
      institution: "Okayama",
      accountId: "okayama3",
      password: "okayama781",
      role: Role.USER,
    },
  ];

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
