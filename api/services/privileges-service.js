const UserDto = require("../dtos/user-dto");
const tokenService = require("./token-service");
const ApiError = require("../exceptions/api-error");
const UserSchema = require("../models/user-model.schema");
const AdminSchema = require("../models/privileges-model.schema");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");

class PrivilegesService {
  async isAdmin(email) {
    const admin = AdminSchema.findOne({email})
    return admin
  }

  async updateModerator(email) {
    return AdminSchema.updateOne({email, moderator: true})
  }

  async updateAdmin(email) {
    return AdminSchema.updateOne({email, admin: true})
  }

  async updateCreator(email) {
    return AdminSchema.updateOne({email, creator: true})
  }

  async getAllUsers(email) {
    const admin = await AdminSchema.find({email})

    console.log(admin)

    const users = await UserSchema.find();

    return users;
  }

  async getAdmin(email) {
    const admin = await AdminSchema.findOne({email});
    return admin;
  }
}

module.exports = new PrivilegesService()