import { Router } from "express";
import * as PatientController from "./controller/patient.controller.js";
import { asyncHandler } from "../../services/errorHandling.js";
const router = Router();

router.get(
  "/getSpecificPatient/:id",
  asyncHandler(PatientController.getSpecificPatient)
);

router.get("/updatePatient/:id", asyncHandler(PatientController.updatePatient));


export default router;
