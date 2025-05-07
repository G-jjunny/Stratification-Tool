import { Router } from "express";

import { getPatientAll } from "../controllers/patient.controller";

const router = Router();

router.get("/patient", getPatientAll);
