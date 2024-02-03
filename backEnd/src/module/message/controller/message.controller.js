//import MessageModel from "../../../../DB/model/message.model.js";
import UserModel from "../../../../DB/model/user.model.js";
import cloudinary from "../../../services/cloudinary.js";
import MessageModel from "../../../../DB/model/message.model.js";
export const insertMessage = async (req, res, next) => {
    try {
        let user = UserModel.findOne({
            where: { DIDE: req.body.DIDE }
        })
        if (user) {
            const { secure_url, public_id } = await cloudinary.uploader.upload(
                req.file.path,
                {
                    folder: `${process.env.APP_NAME}/messages/${req.body.DIDE}`,
                }
            )
            res.status(200).json({ "msg": 'Successfully Send', secure_url, public_id });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ "msg": ' Error while uploading from server' });
    }
};
//-------------------------------------------------------------------------

export const getMessage = async (req, res, next) => {
    const messagesList = await MessageModel.find();
    return res.json({ message: "success", messagesList });
};
//--------------------------------------------------------------------------

export const getSpecificMessage = async (req, res, next) => {
    const findMessage = await MessageModel.findByPk(req.params);
    if (!findMessage) {
        return next(new Error("message not found", { cause: 404 }));
    }
    return res.status(200).json({ message: "success", findMessage });
};
//--------------------------------------------------------------------------
export const sendMessage = async (req, res, next) => {
    const { receiverId } = req.params;
    const { messages } = req.body;
    const user = await UserModel.findById({ _id: receiverId });

    if (!user) {
        return next(new Error("user not found", { cause: 404 }));
    } else {
        const createMessage = await MessageModel.create({
            messages,
            senderId: req.user._id,
            receiverId,
        });

        return res.status(201).json({ msg: "success", createMessage });
    }
};
//-------------------------------------------------------------------
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
