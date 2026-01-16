import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.js";

const Cart = sequelize.define(
    'cart',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        productId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        vendorId: {
            type: DataTypes.UUID,
            allowNull: false // Vendor who added this product
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        productPrice: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        productImage: {
            type: DataTypes.STRING,
            allowNull: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false // quantity * productPrice
        }
    },
    {
        tableName: 'carts',
        timestamps: true,
        underscored: true
    }
);

// Define associations
Cart.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Cart;