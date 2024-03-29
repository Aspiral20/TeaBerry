const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
dotenvExpand.expand(dotenv.config())
const MailService = require('../services/mail-service')

//1
const UserSchema = require('../models/user-model.schema')
const bcrypt = require('bcrypt')              // biblioteca pentru criptare/hashare
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-error')
const ProductSchema = require("../models/product-model.schema");

class UserService {
  async _userGenerateSaveToken(user, field = "all") {
    const userDto = new UserDto(user)   //id, email, isActivated

    async function returnTokensAndUser() {
      const tokens = tokenService.generateTokens({ ...userDto })    // id: {access, refresh}, email: {access, refresh}, isActivated: {access, refresh}
      await tokenService.saveToken(userDto.id, tokens.refreshToken);    // save token into DB

      return {
        ...tokens,
        user: userDto
      }
    }

    switch (field) {
      case "login":
        if (!userDto.isActivated) {
          throw ApiError.BadRequest(`Account was not activated! Check your email: ${userDto.email}`)
        }
        return returnTokensAndUser()
      default:
        return returnTokensAndUser()
    }
  }

  async registration(registrationData) {
    const { full_name, country, city, address, phone, email, password, role, discount } = registrationData

    const candidate = await UserSchema.findOne({ email })                       // cautam daca exista deja utilizatorul cu email-ul dat
    if (candidate) {
      throw ApiError.BadRequest(`User with email: ${email} already exist!`)
    }
    const hashPassword = await bcrypt.hash(password, 3)                   // hash-am parola
    const activationLink = uuid.v4()                                          // returneaza un string random: v34faf-asfasf-31g1g3-sa-asg

    const user = await UserSchema.create({
      full_name,
      country,
      city,
      address,
      phone,
      email,
      password: hashPassword,
      activationLink,
      role,
      discount
    })    // introducem in baza de date email-ul si parola hash
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

    return this._userGenerateSaveToken(user)
  }

  async activate(activationLink) {
    const user = await UserSchema.findOne({ activationLink })
    if (!user) {
      throw ApiError.BadRequest(`Incorrect activation link (${activationLink})!`)
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await UserSchema.findOne({ email })
    if (!user) {
      throw ApiError.BadRequest(`User with this email: ${email} not found `, [{ user }])
    }
    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) {
      throw ApiError.BadRequest(`Invalid password!`, [{ isPassEquals }])
    }

    return this._userGenerateSaveToken(user, "login")
  }

  async logout(refreshToken) {
    return await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError({ refreshToken });
    }
    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError({ userData, tokenFromDb })
    }
    const user = await UserSchema.findById(userData.id)

    return this._userGenerateSaveToken(user)
  }

  async getAllUsers() {
    const users = await UserSchema.find();
    return users;
  }

  async getUser(id) {
    const user = await UserSchema.findById(id);
    return user
  }

  async updateUser(id, data) {
    const user = await UserSchema.updateOne({ id: id }, { $set: data })
    return user
  }

  async searchUsers(data) {
    const { field, regex } = data
    return UserSchema.find({ [field]: { $regex: regex, $options: 'i' } });
  }

  async getAllStatusCountUsers() {
    const count = await UserSchema.find().count();
    const statusCountData = await UserSchema.aggregate([{
      $group: {
        _id: "$role",
        role: { $first: "$role" },
        count: { $count: {} }
      }
    }, {
      $project: {
        _id: 0,
        role: 1,
        count: 1,
        percentage: {
          $round: [{ $multiply: [{ $divide: ["$count", { $literal: count }] }, 100] }, 2],
        },
      }
    }]);

    return [...statusCountData, { role: "total", count: count, percentage: 100 }]
  }

  async updateDiscount(id, body) {
    const { discount } = body

    const data = await UserSchema.updateOne({ id }, { $set: { discount: discount } })
    return data
  }

  async sendDiscountMail(data) {
    const { email, discount } = data

    return await MailService.sendDiscountMail(email, discount)
  }
}

module.exports = new UserService()