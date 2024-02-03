import { where } from "sequelize";
import ResultModel from "../../../../DB/model/result.model.js";
export const showpatientData = async (req, res, next) => {
    //req.header
    const decoded = jwt.verify(token, process.env.BEARERKEY);
    let user = await UserModel.findOne({ WHERE: decoded.role == 'patient' });
    for (i = 0; i <= user.length; i++) {
        res.json({
            userName: user[i].userName,
            email: user[i].email,
            password: user[i].password,
        });
    }
};

//-----------------------------------------------------------
export const getResultPredect = async (req, res, next) => {
    try {
        let user = await ResultModel.findAll();
        return res.status(200).json({ msg: "Successfully Show", "Data": user });
    } catch (error) {
        return res.status(500).json({ msg: "Failed to retrieve result", error });
    }

};
//-----------------------------------------------------------
export const getSpecificPredict = async (req, res, next) => {
    try {
        //const DIDE = req.params.DIDE;
        const patient = await ResultModel.findAll({ where: { DIDE: req.params.DIDE } });
        console.log(patient);
        return res.status(200).json({ msg: "Successfully Show", "Data": patient });

    } catch (error) {
        // Handle the error gracefully
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

};
