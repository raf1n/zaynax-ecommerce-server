const User = require("../User/user.model");
const bcrypt = require("bcrypt");
const jwtHelpers = require("../../../helpers/jwtHelpers");
const config = require("../../../config/config");
const ApiError = require("../../../errors/apiError");
const Admin = require("../User/admin.model");

const registerService = async (payload) => {
  try {
    const { phone, password } = payload;

    const existingUser = await User.findOne({ phone });
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
      { _id: newUser._id, phone: newUser.phone },
      config.jwt.secret,
      config.jwt.expires_in
    );

    return {
      user: newUser,
      accessToken,
    };
  } catch (error) {
    throw new ApiError(500, "Registration failed / User Already Exist", error);
  }
};

const loginService = async (payload) => {
  const { phone, password } = payload;

  const isExistUser = await User.findOne({
    phone,
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
    { _id, phone, role },
    config.jwt.secret,
    config.jwt.expires_in
  );

  return {
    user: isExistUser,
    accessToken,
  };
};

const registerAdminService = async (payload) => {
  try {
    const { userId, password } = payload;

    const existingUser = await Admin.findOne({ user_id: userId });
    if (existingUser) {
      throw new ApiError(400, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newAdmin = new Admin({
      user_id: userId,
      password: hashedPassword,
    });

    await newAdmin.save();

    const accessToken = jwtHelpers.createToken(
      { _id: newAdmin._id, userId: newAdmin.user_id },
      config.jwt.secret,
      config.jwt.expires_in
    );

    return {
      user: newAdmin,
      accessToken,
    };
  } catch (error) {
    throw new ApiError(500, "Registration failed / User Already Exist", error);
  }
};

const adminLoginService = async (payload) => {
  const { userId, password } = payload;

  const admin = await Admin.findOne({ user_id: userId });
  if (!admin) {
    throw new ApiError(400, "Admin does not exist");
  }

  const isMatchPassword = async () => {
    return await bcrypt.compare(password, admin.password);
  };

  if (!isMatchPassword) {
    throw new ApiError(400, "Invalid credentials");
  }

  const accessToken = jwtHelpers.createToken(
    { _id: admin._id, userId: admin.user_id },
    config.jwt.secret,
    config.jwt.expires_in
  );

  return {
    admin,
    accessToken,
  };
};

module.exports = {
  loginService,
  registerService,
  adminLoginService,
  registerAdminService,
};
