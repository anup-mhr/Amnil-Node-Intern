import * as nodemailer from "nodemailer";
import mjml2html from "mjml";

const SMTP_EMAIL: string = process.env.SMTP_EMAIL!;
const SMTP_PASSWORD: string = process.env.SMTP_PASSWORD!;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: SMTP_EMAIL,
    pass: SMTP_PASSWORD,
  },
});

export const sendEmail = (emailTemplate: string, emailTo: string, subject: string): void => {
  const html = mjml2html(emailTemplate).html;

  const mailOptions = {
    from: SMTP_EMAIL,
    to: emailTo,
    subject: subject,
    html: html,
  };

  // Send email
  transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
