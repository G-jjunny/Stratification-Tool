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
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { isReceived, patientId, patientName, isMale, institution, birthday, operationDate, } = req.body;
    try {
        const newPatient = yield prisma.patientData.create({
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
}));
exports.default = router;
