import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const signupSchema = {
    body: joi.object({
        DIDE: generalFields.DIDE,
        userName: joi.string().required(),
        email: generalFields.email,
        password: generalFields.password,
        age: joi.number().integer().required(),
        gender: joi.string().valid("Male", "Female"),
        phoneNumber: joi.number().required(),
        role: joi.string().valid("doctor", "patient"),
    }),
};

export const signinSchema = joi.object({
    email: generalFields.email,
    password: generalFields.password,
});


export const sendCodeSchema = joi.object({
    email: generalFields.email,
});

export const forgetPasswordSchema = joi.object({
    password: generalFields.password,
});
