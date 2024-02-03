import { Router } from "express";
import * as DoctorController from "./controller/doctor.controller.js";
import { auth, roles } from "../../middleware/Auth.js";
import { asyncHandler } from "../../services/errorHandling.js";
import * as validator from "./doctor.validation.js";
import { validation } from "../../middleware/validation.js";
import { endPoint } from "./doctor.endPoint.js";
const router = Router();
router.get("/", auth(), DoctorController.getDoctor);

router.patch(
  "/updatePassword",
  auth(),
  asyncHandler(DoctorController.updatePassword)
);
router.delete(
  "/remove/:id",

  asyncHandler(DoctorController.remove)
);

router.delete(
  "/delete",

  asyncHandler(DoctorController.deleteInvalidcEmail)
);
router.get("/getDataUseId", asyncHandler(DoctorController.getDataUseId));
router.get("/showpatientData", asyncHandler(DoctorController.showpatientData));


router.patch(
  "/updatePassword",
  auth(),
  asyncHandler(DoctorController.updatePassword)
);

router.post("/addPatient", validation(validator.addPatientSchema), asyncHandler(DoctorController.addPatient));

router.patch("/editData/:DIDE", validation(validator.updateUserSchema), asyncHandler(DoctorController.updateUser));

router.get("/getPatient", asyncHandler(DoctorController.getPatient));

router.get("/viewFile/:id", asyncHandler(DoctorController.viewFile));
router.get("/getTotalFile/:id", asyncHandler(DoctorController.getTotalFile));

router.put("/updateDoctor", asyncHandler(DoctorController.updateDoctor));
router.put("/updatePatient", asyncHandler(DoctorController.updatePatient));

router.get("/getTotalPatient", asyncHandler(DoctorController.getTotalPatient));
router.get("/getTotalImage", asyncHandler(DoctorController.getTotalImage));
router.get("/getTotalResult", asyncHandler(DoctorController.getTotalImage));
router.get("/updatePatient/:userName", asyncHandler(DoctorController.getSpecificPatient));

export default router;




