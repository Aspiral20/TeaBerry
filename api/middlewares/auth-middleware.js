const ApiError = require('../exceptions/api-error')
const tokenService = require('../services/token-service')

// https://www.youtube.com/watch?v=fN25fMQZ2v0 - 1:07:27
module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;      // "Bareer $3515sdf12143"
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError({ authorizationHeader }));
    }

    const accessToken = authorizationHeader.split(' ')[1]    // convert into array: "Bareer $3515sdf12143" -> ["Bareer", "$3515sdf12143"]
    if (!accessToken) {
      return next(ApiError.UnauthorizedError({accessToken}));
    }

    const userData = tokenService.validateAccessToken(accessToken)
    if (!userData) {
      return next(ApiError.UnauthorizedError({userData}))
    }

    req.user = userData;
    next();     // ii zice sa se indeplineasca urmatorul middleware

  } catch (errorAuth) {
    return next(ApiError.UnauthorizedError({errorAuth}));
  }
}