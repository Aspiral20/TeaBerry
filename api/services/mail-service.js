const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
const dotenvExpand = require("dotenv-expand");

const myEnv = dotenv.config()
dotenvExpand.expand(myEnv)

//2
class MailService {

  constructor() {
    this.transporter = nodemailer.createTransport({
      port: process.env.SMTP_PORT || 465,
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.APP_USER_PASSWORD
      },
      secure: true,
    })
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: to,
      subject: 'Account activation from ' + process.env.API_URL,
      text: '',
      html: `
        <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; text-align: center ">
          <div>
            <h1 style="display: inline-block; color: green">
              For activation, click link from below.
            </h1>
            <a href="${link}" style="color: lightgreen">
              ${link}
            </a>
          </div>
        </div>
      `
    })
  }
}

module.exports = new MailService()
