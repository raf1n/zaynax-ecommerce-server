const User = require("../User/user.model");
const bcrypt = require("bcrypt");
const jwtHelpers = require("../../../helpers/jwtHelpers");
const config = require("../../../config/config");
const ApiError = require("../../../errors/apiError");

const loginService = async (payload) => {
  const { email, password } = payload;

  const isExistUser = await User.findOne({
    email,
  });

  if (!isExistUser) {
    throw new ApiError(400, "User does not exist");
  }

  const { _id } = isExistUser;

  const isMatchPassword = async () => {
    return await bcrypt.compare(password, isExistUser.password);
  };

  if (!isMatchPassword) {
    throw new ApiError(400, "Invalid credentials");
  }

  const accessToken = jwtHelpers.createToken(
    { _id, email, role },
    config.jwt.secret,
    config.jwt.expires_in
  );

  return {
    user: isExistUser,
    accessToken,
  };
};

module.exports = {
  loginService,
};
