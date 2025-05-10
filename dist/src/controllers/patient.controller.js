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
exports.getPatient = exports.getPatientAll = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
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
