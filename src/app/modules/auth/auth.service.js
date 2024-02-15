const User = require("../User/user.model");
const bcrypt = require("bcrypt");
const jwtHelpers = require("../../../helpers/jwtHelpers");
const config = require("../../../config/config");
const ApiError = require("../../../errors/apiError");

const registerService = async (payload) => {
  try {
    const { phone, password } = payload;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new User({
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    const accessToken = jwtHelpers.createToken(
      { _id: newUser._id, email: newUser.email },
      config.jwt.secret,
      config.jwt.expires_in
    );

    return {
      user: newUser,
      accessToken,
    };
  } catch (error) {
    throw new ApiError(500, "Registration failed", error);
  }
};

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
  registerService,
};
