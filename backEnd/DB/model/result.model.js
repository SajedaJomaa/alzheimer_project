import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';

//creat Result Model
const ResultModel = sequelize.define('Result', {

    predect: {
        type: DataTypes.STRING(90),
        allowNull: false,
    },
    DIDE: {
        type: DataTypes.INTEGER(9),
        allowNull: false,
        unique: false,
    },
});


export default ResultModel;
