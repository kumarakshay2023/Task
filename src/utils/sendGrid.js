const sgMail = require('@sendgrid/mail')
const MAIL_TEMPLATES = require('../templets/email.templets')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const buildAndSendEmail = (template_name, reciever_email, template_vars) => {
      try {
        const chooseTemplate = MAIL_TEMPLATES[template_name](template_vars);
        const msg = {
          to: reciever_email,
          from: 'kumarakshay2023@gmail.com',
          ...chooseTemplate,
        };
        sgMail.send(msg);
  
  
      } catch (error) {
        console.log(error);
      }
    }

    exports.sendUserOrAdminAddEmail = (reciever_email, name,password,email,role) => buildAndSendEmail("USER_ADMIN_ADD", reciever_email, { NAME:name,EMAIL:email,PASSWORD:password,ROLE:role  });
    exports.sendSuperAdminEmailOnBookAdd = (email) =>buildAndSendEmail("BOOK_ADDED",'akshay.kumar@gmail.com',{EMAIL:email});
    exports.sendSuperAdminEmailOnBookUpdate = (email) =>buildAndSendEmail("BOOK_UPDATED",'akshay.kumar@gmail.com',{EMAIL:email})
    exports.sendRejectEmailOnBookAdd = (reciever_email,bookName) =>buildAndSendEmail("REJECTED_BOOK_REQUEST",reciever_email,{BOOKNAME:bookName});
  