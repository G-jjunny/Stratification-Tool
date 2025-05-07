import { Router } from "express";

import { getPatient, getPatientAll } from "../controllers/patient.controller";

const router = Router();

router.get("/patient", getPatientAll);
router.get("/patient/:institution", getPatient);

export default router;
