const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name:{
      type: DataTypes.STRING,
      allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('SUPER_ADMIN', 'ADMIN', 'USER'),
    allowNull: false,
  },
  token:{
    type:DataTypes.STRING,
    allowNull:true,
  },
  resetPasswordToken: DataTypes.STRING,
  resetPasswordExpires: DataTypes.DATE,

});

module.exports = User;
