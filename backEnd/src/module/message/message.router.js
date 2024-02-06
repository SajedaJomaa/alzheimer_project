import { Router } from "express";
import * as MessageController from "./controller/message.controller.js";
import fileUpload from "../../services/multer.js";
import { asyncHandler } from "../../services/errorHandling.js";
const router = Router();

router.get(
    "/getMessages/:id",
    asyncHandler(MessageController.getMessages)
);
router.post("/insertMessage", fileUpload().single('file'), asyncHandler(MessageController.insertMessage));


router.post("/sendMessage/:id", asyncHandler(MessageController.sendMessage));

export default router;
