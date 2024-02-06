import { Router } from "express";
import * as InsertImageController from "./controller/insertImage.controller.js";
import fileUpload from "../../services/multer.js";
import { asyncHandler } from "../../services/errorHandling.js";
import { validation } from "../../middleware/validation.js";
import * as validator from "./insertImage.validation.js";
const router = Router();

router.post("/insertImage", validation(validator.insertImageSchema), fileUpload().single('file'), asyncHandler(InsertImageController.insertImage));
router.post("/callPredect", validation(validator.insertImageSchema), fileUpload().single('file'), asyncHandler(InsertImageController.callPredect));
// router.get("/geturl", asyncHandler(InsertImageController.geturl));

export default router;


