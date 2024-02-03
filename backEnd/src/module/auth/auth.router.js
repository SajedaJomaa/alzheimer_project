import { Router } from "express";
import * as AuthController from "./controller/auth.controller.js";
import { asyncHandler } from "../../services/errorHandling.js";
import * as validator from "./auth.validation.js";
import { validation } from "../../middleware/validation.js";
//import { auth } from "../../middleware/Auth.js";

const router = Router();
router.post(
    "/signup",
    validation(validator.signupSchema),
    asyncHandler(AuthController.signup)
);
router.get("/getDataUseId", asyncHandler(AuthController.getDataUseId));
router.post(
    "/signin",
    validation(validator.signinSchema),
    asyncHandler(AuthController.signin)
);
router.get("/ConfirmEmail/:token", asyncHandler(AuthController.ConfirmEmail));
router.post(
    "/sendCode",
    validation(validator.sendCodeSchema),
    asyncHandler(AuthController.sendCode)
);
router.post(
    "/forgotPassword",
    validation(validator.forgetPasswordSchema),
    asyncHandler(AuthController.forgotPassword)
);
router.get("/logOut ", asyncHandler(AuthController.logOut));


export default router;

