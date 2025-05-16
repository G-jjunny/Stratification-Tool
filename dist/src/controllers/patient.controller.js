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
exports.downloadPatientsExcel = exports.patchDropPatients = exports.getPatient = exports.getPatientAll = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
const xlsx_1 = __importDefault(require("xlsx"));
const getPatientAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patients = yield client_1.default.patientData.findMany();
        res.json(patients);
    }
    catch (err) {
        res.status(500).json({ message: "환자 조회 실패", error: err });
    }
});
exports.getPatientAll = getPatientAll;
const getPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { institution } = req.params;
    try {
        const patients = yield client_1.default.patientData.findMany({
            where: {
                institution,
            },
        });
        res.json(patients);
    }
    catch (err) {
        res.status(500).json({ message: "기관 환자 조회 실패", error: err });
    }
});
exports.getPatient = getPatient;
const patchDropPatients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids } = req.body;
    try {
        //   await prisma.patientData.updateMany({
        //     where: { patientId: { in: ids } },
        //     data: { droped: true },
        //   });
        for (const id of ids) {
            const patient = yield client_1.default.patientData.findUnique({
                where: { patientId: id },
                select: { droped: true },
            });
            if (patient) {
                yield client_1.default.patientData.update({
                    where: { patientId: id },
                    data: { droped: !patient.droped },
                });
            }
        }
        return res.status(200).json({ message: "Patients marked as dropped" });
    }
    catch (err) {
        console.error("Drop error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.patchDropPatients = patchDropPatients;
const downloadPatientsExcel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patients = yield client_1.default.patientData.findMany();
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
        const worksheet = xlsx_1.default.utils.json_to_sheet(excelData);
        const workbook = xlsx_1.default.utils.book_new();
        xlsx_1.default.utils.book_append_sheet(workbook, worksheet, "Patients");
        // 엑셀 파일을 binary 문자열로 생성
        const binaryExcel = xlsx_1.default.write(workbook, {
            type: "binary",
            bookType: "xlsx",
        });
        // binary 문자열을 버퍼로 변환
        const buffer = Buffer.from(binaryExcel, "binary");
        // 응답 헤더 설정
        res.setHeader("Content-Disposition", "attachment; filename=patients.xlsx");
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Length", buffer.length);
        res.setHeader("Cache-Control", "no-cache");
        // 버퍼 전송
        return res.end(buffer);
    }
    catch (error) {
        console.error("Excel download error:", error);
        return res.status(500).json({ message: "엑셀 다운로드 실패", error });
    }
});
exports.downloadPatientsExcel = downloadPatientsExcel;
