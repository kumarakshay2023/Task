const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn");

const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderByUserId:{
        type: DataTypes.INTEGER,
        required:true
    },
    bookId:{
        type: DataTypes.INTEGER,
        required:true
    },
    qty:{
        type:DataTypes.INTEGER,
        defaultValue:0
    }

  });

  module.exports =Order