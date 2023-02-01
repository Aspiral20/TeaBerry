module.exports = class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super()
    this.status = status
    this.message = message
    this.errors = errors
  }

  static UnauthorizedError(params = {}) {
    return new ApiError(401, 'User was not authorized', params)
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors)
  }

  static UserAlreadyExistError(message, errors = []) {
    return new ApiError(409, message, errors)
  }

  static InternalCodeSyntax(errors = {}) {
    return new ApiError(406, 'Internal code syntax', errors)
  }

}