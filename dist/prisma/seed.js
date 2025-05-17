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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = require("./user");
const client_1 = __importDefault(require("./client"));
const neoadjFromExcel_1 = require("./neoadjFromExcel");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // 기존 유저 데이터 삭제
        yield client_1.default.user.deleteMany();
        yield client_1.default.neoY.deleteMany();
        yield client_1.default.neoN.deleteMany();
        // 엑셀 데이터 삽입
        yield (0, neoadjFromExcel_1.neoadjFromExcel)("NeoY.xlsx", "neoY");
        yield (0, neoadjFromExcel_1.neoadjFromExcel)("NeoN.xlsx", "neoN");
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
        for (const user of user_1.users) {
            const hashedPassword = yield bcryptjs_1.default.hash(user.password, 10); // 🔐 비밀번호 해싱
            yield client_1.default.user.create({
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
    yield client_1.default.$disconnect();
}));
