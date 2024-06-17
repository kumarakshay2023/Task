exports.USER_ADMIN_ADD = ({ NAME,EMAIL,PASSWORD,ROLE }) => ({
    templateId:'d-09f74483445f42098c607fade72f43cb',
    dynamic_template_data: {
        EMAIL,
        PASSWORD,
        NAME,
        ROLE
    },
});

exports.BOOK_ADDED = ({EMAIL})=>({
    templateId:'d-0944e327951a4a5e89ca721ebeb83c88',
    dynamic_template_data: {
       EMAIL
    },
})

exports.BOOK_UPDATED=({EMAIL})=>({
    templateId:'d-1ccd27d60e51434ca6f47a4c750f6bba',
    dynamic_template_data: {
       EMAIL
    },
})