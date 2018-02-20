const nodemailer = require('nodemailer');

const getUser = require('../../queries/getUser');

const transport = {
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

const defaults = {
  from: '"Chrappy" <chrappy@outlook.com>',
};

const transporter = nodemailer.createTransport(transport, defaults);

const sendInvites = (emails, groupName, groupId) => {
  Promise.all(emails.map(email => getUser(email)))
    .then(existingUsers =>
      existingUsers.map((user) => {
        if (user) {
          return { userId: user.id, groupId };
        }
        return { groupId };
      }));
  const message = {
    to: emails,
    subject: `Invitation to join Secret Santa group ${groupName}`,
    text: 'message body',
    html: '<h1>html message body</h1>',
  };
  return transporter.sendMail(message);
};

module.exports = { sendInvites };
