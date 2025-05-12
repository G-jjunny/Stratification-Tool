import { Router } from "express";

import {
  downloadPatientsExcel,
  getPatient,
  getPatientAll,
  patchDropPatients,
} from "../controllers/patient.controller";

const router = Router();

router.get("/patient", getPatientAll);
router.get("/patient/:institution", getPatient);
router.patch("/patient/drop", patchDropPatients);
router.get("/patient/download", downloadPatientsExcel);

export default router;
