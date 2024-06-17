const sgMail = require('@sendgrid/mail')
const MAIL_TEMPLATES = require('../templets/email.templets')

sgMail.setApiKey('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')

const buildAndSendEmail = (template_name, reciever_email, template_vars) => {
      try {
        const chooseTemplate = MAIL_TEMPLATES[template_name](template_vars);
        console.log('asdad',chooseTemplate)
        const msg = {
          to: reciever_email,
          from: 'kumarakshay2023@gmail.com',
          ...chooseTemplate,
        };
        console.log('asdasd',msg)
        sgMail.send(msg);
  
  
      } catch (error) {
        console.log(error);
      }
    }

    exports.sendUserOrAdminAddEmail = (reciever_email, name,password,email,role) => buildAndSendEmail("USER_ADMIN_ADD", reciever_email, { NAME:name,EMAIL:email,PASSWORD:password,ROLE:role  });
  