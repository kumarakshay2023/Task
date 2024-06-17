const sequelize = require("../db/conn");

const User = require("./user");
const Book = require("./book");
const Order = require("./order");

User.hasMany(Book,{foreignKey: 'addedByAdminId'})
Book.belongsTo(User,{foreignKey: 'addedByAdminId'})

Book.hasMany(Order,{foreignKey: 'bookId'})
Order.belongsTo(Book,{foreignKey: 'bookId'})

User.hasMany(Order,{foreignKey: 'orderByUserId'})
Order.belongsTo(User,{foreignKey: 'orderByUserId'})


sequelize.sync({ force:false, logging: false }).catch((err) => console.log(err));

module.exports = {
  User,

};
