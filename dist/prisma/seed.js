"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // 관리자 계정 2개 생성
        const admin1 = yield prisma.user.create({
            data: {
                accountId: "admin1",
                password: "adminpassword1", // 실제로는 암호화된 비밀번호 사용
                role: "ADMIN", // 예시로 'ADMIN' 역할 지정
                institution: "ADMIN",
            },
        });
        const admin2 = yield prisma.user.create({
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
                yield prisma.user.create({
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
    });
}
main()
    .catch((e) => {
    console.error(e);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
