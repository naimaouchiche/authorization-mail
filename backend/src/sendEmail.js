/* eslint-disable no-restricted-syntax */
const mailer = require("./mailer");

const sendEmail = (req) => {
  const { email } = req.body;

  mailer.sendMail(
    {
      from: "amina.aitm@gmail.com",
      to: email,
      subject: `Bienvenue ${req.body.firstname}`,
      text: "Nous te souhaitons la bienvenue",
      html: "<p>Nous te souhaitons la bienvenue</p>",
    },
    (err, info) => {
      if (err) console.error(err);
      else console.log(info);
    }
  );
};

module.exports = {
  sendEmail,
};
