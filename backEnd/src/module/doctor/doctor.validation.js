import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const addPatientSchema = {
    body: joi.object({
        DIDE: generalFields.DIDE,
        userName: joi.string().required(),
        email: generalFields.email,
        password: generalFields.password,
        age: joi.number().integer(),
        gender: joi.string().valid("Male", "Female"),
        phoneNumber: joi.number().required(),
        role: joi.string().valid("doctor", "patient"),
    }),
};

export const updateUserSchema = {
    body: joi.object({
        userName: joi.string().required(),
        email: generalFields.email,
        password: generalFields.password,

    }),

}
