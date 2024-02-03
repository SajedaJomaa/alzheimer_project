import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';


// Create Doctor Model
const UserModel = sequelize.define('users', {
    userName: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    DIDE: {
        type: DataTypes.INTEGER(9),
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(90),
        allowNull: false,
    },

    age: {
        type: DataTypes.INTEGER,
    },
    gender: {
        type: DataTypes.STRING,
        validate: {
            isIn: [['Male', 'Female']], // Check that the value is 'Male' or 'Female'
        },
    },
    phoneNumber: {
        type: DataTypes.STRING, // Consider using STRING for phone numbers
        allowNull: false,
    },

    confirmEmail: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    sendCode: {
        type: DataTypes.STRING(4),
        defaultValue: null,
    },
    changePasswordTime: {
        type: DataTypes.DATE,
    },
    role: {
        type: DataTypes.ENUM('doctor', 'patient'),
        allowNull: false,
        defaultValue: 'doctor',
    }

}, {
    timestamps: false,
});



export default UserModel;
