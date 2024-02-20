const config = require("../../../config/config");
const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const AuthService = require("./auth.service");

const register = catchAsync(async (req, res, next) => {
  const result = await AuthService.registerService(req.body);

  const { accessToken, user } = result;

  const { password, ...userInfo } = user._doc;

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully!",
    data: {
      user: userInfo,
      accessToken,
    },
  });
});

const login = async (req, res, next) => {
  try {
    const result = await AuthService.loginService(req.body);
    const { accessToken, user } = result;

    const { password, ...userInfo } = user._doc;

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User logged in successfully!",
      data: {
        userInfo,
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const adminRegister = catchAsync(async (req, res, next) => {
  const result = await AuthService.registerAdminService(req.body);
  const { accessToken, user } = result;

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Admin registered successfully!",
    data: {
      user,
      accessToken,
    },
  });
});

const adminLogin = catchAsync(async (req, res, next) => {
  const result = await AuthService.adminLoginService(req.body);
  const { accessToken, admin } = result;

  const { password, ...user } = admin._doc;

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin logged in successfully!",
    data: {
      user,
      accessToken,
    },
  });
});

module.exports = {
  login,
  register,
  adminLogin,
  adminRegister,
};
