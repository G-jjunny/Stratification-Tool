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
exports.deletePatient = exports.updatePatient = exports.registerPatient = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
const registerPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { isReceived, patientId, patientName, isMale, institution, birthday, operationDate, } = req.body;
    try {
        const newPatient = yield client_1.default.patientData.create({
            data: {
                isReceived,
                patientId,
                patientName,
                isMale,
                institution,
                birthday,
                operationDate,
            },
        });
        return res.status(201).json({
            message: "Patient data registered successfully",
            patient: newPatient,
        });
    }
    catch (error) {
        console.error("Error registering patient:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.registerPatient = registerPatient;
// 수정
const updatePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { isReceived, patientId, patientName, isMale, institution, birthday, operationDate, } = req.body;
    try {
        const updatedPatient = yield client_1.default.patientData.update({
            where: { id: id },
            data: {
                isReceived,
                patientId,
                patientName,
                isMale,
                institution,
                birthday,
                operationDate,
            },
        });
        return res.status(200).json({
            message: "Patient data updated successfully",
            patient: updatedPatient,
        });
    }
    catch (error) {
        console.error("Error updating patient:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.updatePatient = updatePatient;
// 삭제
const deletePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield client_1.default.patientData.delete({
            where: { id: id },
        });
        return res.status(200).json({ message: "Patient deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting patient:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.deletePatient = deletePatient;
