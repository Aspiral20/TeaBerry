const { UserService } = require('../services')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const { validationResult } = require("express-validator");
dotenvExpand.expand(dotenv.config())
const ApiError = require('../exceptions/api-error')
const TimeService = require('../services/time-service')

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error!', errors.array()))
      }
      const registrationData = req.body;
      const userData = await UserService.registration(registrationData)

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: TimeService.getTime('30d'),
        httpOnly: true,
        // secure: true     //pentru HTTPS
      })
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.login(email, password)

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: TimeService.getTime('30d'),
        httpOnly: true,
        // secure: true     //pentru HTTPS
      })
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const token = await UserService.logout(refreshToken);
      res.clearCookie('refreshToken')
      return res.json({ statusCode: 200, token })
    } catch (e) {
      next(e)
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await UserService.activate(activationLink)
      return res.redirect(process.env.CLIENT_URL + '/auth/successful_registered')
    } catch (e) {
      next(e)
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.refresh(refreshToken);
      // res.clearCookie('refreshToken')
      return res.json(token)
    } catch (e) {
      next(e)
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers()
      return res.json(users)
    } catch (e) {
      next(e)
    }
  }

  async getUser(req, res, next) {
    try {
      const userId = req.params.id
      const user = await UserService.getUser(userId)
      return res.json(user)
    } catch (e) {
      next(e)
    }
  }

  async updateUser(req, res, next) {
    try {
      const userId = req.params.id
      const data = req.body
      const user = await UserService.updateUser(userId, data)

      return res.json({statusCode: 200, user})
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new UserController()