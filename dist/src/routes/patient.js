"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patient_controller_1 = require("../controllers/patient.controller");
const router = (0, express_1.Router)();
router.get("/patient", patient_controller_1.getPatientAll);
router.get("/patient/:institution", patient_controller_1.getPatient);
exports.default = router;
