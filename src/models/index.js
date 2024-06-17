const sequelize = require("../db/conn");

const User = require("./user");
const Book = require("./book");

User.hasMany(Book,{foreignKey: 'addedByAdminId'})
Book.belongsTo(User,{foreignKey: 'addedByAdminId'})

sequelize.sync({ force: false, logging: false }).catch((err) => console.log(err));

module.exports = {
  User,

};
