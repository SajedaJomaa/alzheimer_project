import { spawn } from "child_process";
import cloudinary from "../../../services/cloudinary.js";
import { sendEmail } from '../../../services/sendEmail.js';
import ImageModel from "../../../../DB/model/image.model.js";
import UserModel from "../../../../DB/model/user.model.js";
import ResultModel from "../../../../DB/model/result.model.js";
export const insertImage = async (req, res) => {
  try {
    let user = UserModel.findOne({
      where: { DIDE: req.body.DIDE }
    })
    if (user) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: `${process.env.APP_NAME}/patients/${req.body.DIDE}`,
        }
      )
      //const id = await getId(req);
      //callPredect(req, id);
      res.status(200).json({ "msg": 'Successfully Upload', secure_url, public_id });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ "msg": ' Error while uploading' });
  }

};

export const sendResultEmail = async (req, predict) => {
  let DIDE = req.body.DIDE;
  let pred = predict;
  let patient = await UserModel.findOne({ where: { DIDE: req.body.DIDE } });
  let email = patient.email;
  const html = `<html><body><div><h2> the ID for patient is :${DIDE}  </h2><h2>the result of prediction: ${pred}</h2>
  </div>
  </body>
 </html>`;
  const attachments = [{
    filename: 'image.png',
    path: req.file.path,
  }]
  await sendEmail(process.env.DOCTOREMAIL, 'THE Result of Detection Details:', html, attachments);

  await sendEmail(email, 'THE Result of Detection Details:', html, attachments);
}

export const callPredect = async (req, res) => {
  const python = spawn('python', ["python/app2.py", req.file.path]);
  let outputData = '';

  python.stdout.on('data', (data) => {
    outputData += data.toString();
  });

  python.on('error', (error) => {
    console.error('error: ', error.message);
  });

  python.on('close', async (code) => {
    console.log('child process exited with code ', code);

    // Now 'outputData' contains the output of the Python script
    console.log('Output: ', outputData);
    // Define a regular expression pattern to match any word in that position
    const lines = outputData.split('\n');
    const lastLine = lines[lines.length - 1];

    // Trim any leading or trailing whitespaces
    const cleanedResult = lastLine.trim();

    let predect = cleanedResult;
    const id = await getId(req);
    const result = await ResultModel.create({
      id,
      DIDE: req.body.DIDE,
      predect
    });
    const imageData = await ImageModel.create({
      id,
      DIDE: req.body.DIDE,
      Path: req.file.path
    });
    sendResultEmail(req, predect);
    res.status(200).json({ "msg": 'Successfully Predict', "predect": predect });

    return predect;

  });
};
export const getId = async (req, res, next) => {
  try {

    let id;

    const randomPart = Math.floor(Math.pow(10, 8) + Math.random() * 9 * Math.pow(10, 8));
    id = randomPart;

    return id;
  } catch (error) {
    console.error('Error generating ID:', error);
    throw error;
  }
}
