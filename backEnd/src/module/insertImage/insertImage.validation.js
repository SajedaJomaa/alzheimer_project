import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const insertImageSchema = joi.object({
    DIDE: generalFields.DIDE,
    file: generalFields.file.required(),
});
