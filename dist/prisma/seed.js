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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // 기존 유저 데이터 삭제
        yield prisma.user.deleteMany();
        // 사용자 목록 생성
        const users = [
            {
                institution: "SMC",
                accountId: "admin",
                password: "smc12345",
                role: client_1.Role.ADMIN,
            },
            {
                institution: "SMC",
                accountId: "smc1",
                password: "smc2472",
                role: client_1.Role.USER,
            },
            {
                institution: "SMC",
                accountId: "smc2",
                password: "smc6587",
                role: client_1.Role.USER,
            },
            {
                institution: "SMC",
                accountId: "smc3",
                password: "smc0369",
                role: client_1.Role.USER,
            },
            {
                institution: "NCCE",
                accountId: "ncce1",
                password: "ncce483",
                role: client_1.Role.USER,
            },
            {
                institution: "NCCE",
                accountId: "ncce2",
                password: "ncce990",
                role: client_1.Role.USER,
            },
            {
                institution: "NCCE",
                accountId: "ncce3",
                password: "ncce481",
                role: client_1.Role.USER,
            },
            {
                institution: "Juntendo",
                accountId: "juntendo1",
                password: "juntendo474",
                role: client_1.Role.USER,
            },
            {
                institution: "Juntendo",
                accountId: "juntendo2",
                password: "juntendo368",
                role: client_1.Role.USER,
            },
            {
                institution: "Juntendo",
                accountId: "juntendo3",
                password: "juntendo482",
                role: client_1.Role.USER,
            },
            {
                institution: "Okayama",
                accountId: "okayama1",
                password: "okayama832",
                role: client_1.Role.USER,
            },
            {
                institution: "Okayama",
                accountId: "okayama2",
                password: "okayama809",
                role: client_1.Role.USER,
            },
            {
                institution: "Okayama",
                accountId: "okayama3",
                password: "okayama781",
                role: client_1.Role.USER,
            },
        ];
        for (const user of users) {
            const hashedPassword = yield bcryptjs_1.default.hash(user.password, 10); // 🔐 비밀번호 해싱
            yield prisma.user.create({
                data: Object.assign(Object.assign({}, user), { password: hashedPassword }),
            });
        }
        console.log("데이터가 성공적으로 생성되었습니다.");
    });
}
main()
    .catch((e) => {
    console.error("❌ Seed error:", e);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
