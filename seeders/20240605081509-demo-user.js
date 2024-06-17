const bcrypt  = require('bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
       await queryInterface.bulkInsert('Users', [{
        email:'superadmin@gmail.com',
        password:await bcrypt.hash('1234',10),
        name:'Super Admin',
        role:'SUPER_ADMIN',
        token:null,
        createdAt: new Date(),
        updatedAt:new Date(),
     }], {});
   
    
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
  
};
