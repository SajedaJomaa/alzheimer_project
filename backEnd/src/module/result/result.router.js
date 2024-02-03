import { Router } from "express";
import * as ResultController from "./controller/result.controller.js";
import { asyncHandler } from "../../services/errorHandling.js";
const router = Router();

router.get("/showpatientData", ResultController.showpatientData);
router.get("/getResultPredect", ResultController.getResultPredect);
router.get("/getSpecificPredict/:DIDE", asyncHandler(ResultController.getSpecificPredict));


export default router;
