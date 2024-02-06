import joi from "joi";


export const generalFields = {
  DIDE: joi.string().pattern(/^\d{9}$/).required(),

  email: joi.string().email().required().messages({
    "string.empty": "email is required",
    "string.email": "plz enter a valid email",
  }),

  password: joi.string().required().messages({
    "string.empty": "password is required",
  }),
  file: joi.object({
    size: joi.number().positive().required(),
    path: joi.string().required(),
    filename: joi.string().required(),
    destination: joi.string().required(),
    mimetype: joi.string().required(),
    encoding: joi.string().required(),
    originalname: joi.string().required(),
    dest: joi.string(),
    fieldname: joi.string().required(),
  }),
};
export const validation = (Schema) => {
  return (req, res, next) => {
    const dataMethods = ["body", "query", "params", "headers", "file"];
    const validationArray = []; // تخزن فيها الاخطاء
    dataMethods.forEach((key) => {
      //  console.log(key);
      if (Schema[key]) {
        const validationResult = Schema[key].validate(req[key], {
          abortEarly: false,
        });
        if (validationResult.error) {
          validationArray.push(validationResult.error.details);
        }
      }
    });
    if (validationArray.length > 0) {
      return res.json({ "msg": "validation error", validationArray });
    } else {
      next();
    }
  };
};
