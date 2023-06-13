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

  async sendActivationMail(email, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Account activation from ' + process.env.API_URL,
      text: 'TeaBerry Registration',
      html: `
        <div style="display: flex;justify-content: center;align-items: center;width: 100%;height: 100%;text-align: center">
          <div style="justify-self: center">
            <h1 style="display: inline-block; color: green">
              For activation, click link from below.
            </h1>
            <div>
              <a href="${link}" style="color: lightgreen">
                Activate your account
              </a>
            </div>
          </div>
        </div>
      `
    })
  }


  async sendDiscountMail(email, discount) {
    const gen6CharCode = (Math.random() + 1).toString(36).substring(7)

    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Account activation from ' + process.env.API_URL,
      text: 'TeaBerry - Get Discount',
      html: `
        <div style="display: flex;justifyContent: center;alignItems: center;width: 100%;height: 100%;text-align: center">
          <div style="justify-self: center">
            <h1 style="display: inline-block; color: green">
              For getting ${discount}% discount, copy the code below and paste it on website!
            </h1>
            <div style="font-size: 20px;">
              Discount code: <span style="font-weight: bold">${gen6CharCode}</span>
            </div>
          </div>
        </div>
      `
    })

    return { discountCode: gen6CharCode }
  }

}

module.exports = new MailService()
