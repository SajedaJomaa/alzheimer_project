import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

//creat Message Model
const MessageModel = sequelize.define(
    'Message',
    {

        messages: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        receiverId: {
            type: DataTypes.NUMBER,
            allowNull: false,

        },
        senderId: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },

        text: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: false,
    }
);

export default MessageModel;
