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

exports.REJECTED_BOOK_REQUEST = ({EMAIL})=>({
    templateId:'d-9a9ad55189d64fa8a3b9f2e60ad4ac97',
    dynamic_template_data: {
        EMAIL
     },
});

exports.SEND_ORDER_BOOK=({BOOKNAME,USER})=>({
    templateId:'d-87b8b1300854473da33783425dbd14f3',
    dynamic_template_data: {
        BOOKNAME,
        USER
     },
})

exports.SEND_FORGOT_PASSWORD =({Link,NAME})=>({
    templateId:'d-bc23aa323c034aeba2ab2985359faea2',
    dynamic_template_data: {
      Link,
      NAME
     },
})