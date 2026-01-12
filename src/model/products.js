import sequelize from "../config/db.js";

import { DataTypes } from "sequelize";

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
            //relation with user model (vendor)
            references: {
                model: 'users',
                key: 'id'
            },
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        categories: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
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
        underscored: true,
    }
);

export default Products;