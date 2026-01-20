import Sequelize from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()
const db_uri = process.env.DB_URI


const sequelize = new Sequelize(db_uri, { dialect: 'postgres' })
export { sequelize }

export default sequelize;