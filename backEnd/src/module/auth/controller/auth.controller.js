import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../../../services/sendEmail.js';
import { customAlphabet } from 'nanoid';
import UserModel from '../../../../DB/model/user.model.js';

//-----------------------------------------------------------------------------
export const signup = async (req, res, next) => {
  const { DIDE, userName, email, password, role, phoneNumber, gender, age } =
    req.body;

  try {
    let reqData = await UserModel.findOne({ where: { email: email } });
    if (reqData) {
      return res.json({ msg: 'You are already register' });
    }
    const hashedPassword = bcrypt.hashSync(
      password,
      parseInt(process.env.SALTROUND)
    );

    const token = jwt.sign({ email }, process.env.CONFIRMEMAILSECRET, {
      expiresIn: '1h',
    });

    const createUser = await UserModel.create({
      DIDE,
      userName,
      email,
      password: hashedPassword,
      phoneNumber,
      gender,
      age,
      role,
      confirmEmail: true,
    });
    return res.status(200).json({ msg: 'Successfully register', createUser, token });
  } catch (error) {
    console.log('error from register route', error);
    res.json({ msg: 'error in register a user' });
  }
};

//-----------------------------------------------------
export const ConfirmEmail = async (req, res, next) => {
  const token = req.params.token;
  const decoded = jwt.verify(token, process.env.CONFIRMEMAILSECRET);
  if (!decoded) {
    return res.status(404).json({ msg: 'Invalid token' });
  }
  const d = await UserModel.update(
    { confirmEmail: true }, // The values to update
    {
      where: {
        email: decoded.email, // Condition: email matches decoded.email
        confirmEmail: false, // Condition: confirmEmail is false
      },
    },
    {
      new: true,
    }
  );
  if (d[0] > 0) {
    // Update successful
    const updatedUsers = d[1]; // Array of updated doctor objects (if needed)
    return res
      .status(200)
      .json({ msg: 'Your email is verified', updatedUsers });
  } else {
    // No rows were updated
    return res
      .status(400)
      .json({ msg: 'Invalid verification or email is already verified' });
  }
};
//---------------------------------------------------------------------
export const sendCode = async (req, res, next) => {
  try {
    const { email } = req.body;
    let code = customAlphabet('1234567890abcdzABCDZ', 4);
    code = code();
    const user = await UserModel.update(
      { sendCode: code }, // The values to update
      {
        where: {
          email: email, // Condition: email matches decoded.email
        },
      },
      {
        new: true,
      }
    );
    const html = `<h2> code is : ${code} </h2>`;
    await sendEmail(email, `resetPassword`, html);
    return res.status(200).json({ msg: 'Successfully send', user });
  } catch {
    console.log('error from send route', error);
    res.json({ msg: 'error in send ' });
  }
};

//---------------------------------------------------------------------
export const forgotPassword = async (req, res, next) => {
  try {
    const { password, confirmCode } = req.body;

    // Check if user exists
    const user = await UserModel.findOne({ where: { sendCode: confirmCode } });

    if (!user) {
      return res.status(404).json({ msg: 'Code not found' });
    }

    const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALTROUND));
    user.password = hashedPassword;
    await user.save(); // Make sure to use 'await' here, as 'save' might be asynchronous

    res.status(200).json({ msg: 'Successfully Reset Password' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

//-----------------------------------------------------------------
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const reqData = await UserModel.findOne({
      where: {
        email,
      },
    });
    if (!reqData) {
      return res.json({ msg: 'register first' });
    } else if (!reqData.confirmEmail) {
      return res.json({ msg: 'plz confirm your email' });
    } else {
      const match = await bcrypt.compare(password, reqData.password);
      if (!match) {
        return res.json({ msg: 'data Invalid (pass)' });
      } else {
        const token = jwt.sign(
          { email: reqData.email, role: reqData.role, DIDE: reqData.DIDE },
          process.env.LOGINSECRET,
          {
            expiresIn: '1h',
          }
        );
        res.json({
          "msg": 'Successfully signin',
          " token": token,
          "role": reqData.role,
          "DIDE": reqData.DIDE
        });
      }
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({
        error: true,
        message: "Token expired",
      });
    }
    console.log('error from login route', error);
    res.json({ msg: 'error in login a user' });
  }
};
//-------------------------------------------------------------------------

