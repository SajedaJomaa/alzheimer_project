import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';

//creat Image Model
const ImageModel = sequelize.define('Image', {
    Path: {
        type: DataTypes.STRING(100),
        allowNull: false,
    }, DIDE: {
        type: DataTypes.INTEGER(9),
        allowNull: false,
        unique: false,
    },


});


export default ImageModel;
