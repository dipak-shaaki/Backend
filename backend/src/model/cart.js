import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

const Cart=sequelize.define(
    'Cart',
    {
        id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            allowNull:false,
            primaryKey:true
        },

        user_id:{
           type:DataTypes.UUID,
           allowNull:false,
           references:{
            model:'users',
            key:'id'
           }   
        },

        item_id:{
            type:DataTypes.UUID,
            allowNull:false,
            references:{
                model:'products',
                key:'id',
            },
        },
        no_of_item:{
            type:DataTypes.INTEGER,
            allowNull:false,  
            defaultValue:1, 
        },
        status:{
            type:DataTypes.ENUM('pending','checkout'),
            allowNull:false,
            defaultValue:'pending'
        }
    },
    {
        tableName:'carts',
        timestamps:true,
    }
)

export {Cart}