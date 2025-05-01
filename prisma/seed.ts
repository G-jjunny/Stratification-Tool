import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 관리자 계정 2개 생성
  const admin1 = await prisma.user.create({
    data: {
      accountId: "admin1",
      password: "adminpassword1", // 실제로는 암호화된 비밀번호 사용
      role: "ADMIN", // 예시로 'ADMIN' 역할 지정
      institution: "ADMIN",
    },
  });

  const admin2 = await prisma.user.create({
    data: {
      accountId: "admin2",
      password: "adminpassword2",
      role: "ADMIN",
      institution: "ADMIN",
    },
  });

  // 5개 기관에 각 3개 계정 생성
  const institutions = [
    "Institute1",
    "Institute2",
    "Institute3",
    "Institute4",
    "Institute5",
  ];

  for (const institute of institutions) {
    for (let i = 1; i <= 3; i++) {
      await prisma.user.create({
        data: {
          accountId: `${institute.toLowerCase()}_user${i}`,
          password: `password${i}`, // 실제로는 암호화된 비밀번호 사용
          role: "USER", // 예시로 'USER' 역할 지정
          institution: institute, // 기관 이름을 연결
        },
      });
    }
  }

  console.log("데이터가 성공적으로 생성되었습니다.");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
