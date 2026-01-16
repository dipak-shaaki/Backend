import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.js";

const Products = sequelize.define(
    'products',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        vendorsId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        categories: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        inStock: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true
        }
    },
    {
        tableName: 'products',
        timestamps: true,
        underscored: true
    }
)

// Define associations
Products.belongsTo(User, { foreignKey: 'vendorsId', as: 'vendor' });

export default Products;