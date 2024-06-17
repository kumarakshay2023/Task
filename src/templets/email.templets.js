exports.USER_ADMIN_ADD = ({ NAME,EMAIL,PASSWORD,ROLE }) => ({
    templateId:'d-09f74483445f42098c607fade72f43cb',
    dynamic_template_data: {
        EMAIL,
        PASSWORD,
        NAME,
        ROLE
    },
});