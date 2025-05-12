import { Router } from "express";

import {
  getPatient,
  getPatientAll,
  patchDropPatients,
} from "../controllers/patient.controller";

const router = Router();

router.get("/patient", getPatientAll);
router.get("/patient/:institution", getPatient);
router.patch("/patient/drop", patchDropPatients);
router.get("/patient/download");

export default router;
