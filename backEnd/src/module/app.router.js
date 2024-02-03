import { connectDB } from "../../DB/connection.js";
import authRouter from "./auth/auth.router.js";
import patientRouter from "./patient/patient.router.js";
import insertRouter from '../module/insertImage/insertImage.router.js';
import doctorRouter from "./doctor/doctor.router.js";
import resultRouter from "../module/result/result.router.js";
import messageRouter from "../module/message/message.router.js";
import { globalErrorHandler } from "../services/errorHandling.js";

const initApp = (app, express) => {
  app.use(express.json());
  connectDB();

  app.use("/auth", authRouter);
  app.use("/patient", patientRouter);
  app.use("/doctor", doctorRouter);
  app.use("/insertImage", insertRouter);
  app.use("/result", resultRouter);
  app.use("/message", messageRouter);
  app.use("*", (req, res) => {
    return res.json({ message: "Page not found" });
  });
  app.use((err, req, res, next) => {
    if (err) {
      return res.json({ message: err.message });
    }
  });

  app.use(globalErrorHandler);



};


export default initApp;
