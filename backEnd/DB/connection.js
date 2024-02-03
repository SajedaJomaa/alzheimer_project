import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('alzheimer_project', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});
export const connectDB = async (req, res) => {
    return await sequelize.sync({ alter: false })
        .then(result => {
            console.log("db connected");
        }).catch(err => {
            console.log(err);
        })
}
