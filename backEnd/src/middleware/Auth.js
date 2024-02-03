import jwt from "jsonwebtoken";
import UserModel from "../../DB/model/user.model.js";
export const roles = {
  Doctor: "Doctor",
  Patient: "Patient",
};


export const auth = (accessRoles = []) => {
  return async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization?.startsWith(process.env.BEARERKEY)) {
      return res.status(400).json({ "msg": "Invalid authorization" });
    }

    const token = authorization.split(process.env.BEARERKEY)[1];

    const decoded = jwt.verify(token, process.env.LOGINSECRET);

    if (!decoded) {
      return res.status(400).json({ "msg": "Invalid authorization" });
    }
    const user = await UserModel.findOne(decoded.DIDE);

    if (!user) {
      return res.status(404).json({ "msg": "not registered user" });
    }
    const changePasswordTimeInSeconds = parseInt(
      user.changePasswordTime?.getTime() / 1000
    );
    const tokenIssuedAtInSeconds = decoded.iat;

    if (changePasswordTimeInSeconds > tokenIssuedAtInSeconds) {
      return next(new Error("expired token , plz login"), { cause: 400 });
    }
    if (!accessRoles.includes(user.roles)) {
      return res.status(403).json({ "msg": "not auth User" });
    }
    req.user = user;

    next();
  };
};
