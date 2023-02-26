const jwt = require("jsonwebtoken");
const TokenSchema = require("../models/token-model.schema");
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')

dotenvExpand.expand(dotenv.config())

//Decode token: jwt.io
//3
class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '1h'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
    return {
      accessToken,
      refreshToken
    }
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)     // verificam daca coiencid
      return userData
    } catch (e) {
      return null
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
      return userData
    } catch (e) {
      return null
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await TokenSchema.findOne({user: userId})
    if (tokenData) {    //daca gasim ceva in baza de date
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await TokenSchema.create({user: userId, refreshToken});
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await TokenSchema.deleteOne({ refreshToken });
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await TokenSchema.findOne({ refreshToken });
    return tokenData;
  }

//  todo updateToken
}

module.exports = new TokenService()