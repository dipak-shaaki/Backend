import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Product=sequelize.define(
    'Product',
    {
        id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true,
           },
           vendorid:{
              type:DataTypes.UUID,
              allowNull:false,
              references:{
                model:'users',
                key:'id',
              }
           },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        categories:{    
            type:DataTypes.ARRAY(DataTypes.STRING),
            defaultValue:[],
            allowNull:false,
        },
        image:{
            type:DataTypes.STRING,
        },
        price:{
            type:DataTypes.FLOAT,
            allowNull:false,
        },
        instock:{
            type:DataTypes.INTEGER,
            defaultValue:0
        }
    },
    {
        tableName:'products',
        timestamps:true
    }
)
export {Product}