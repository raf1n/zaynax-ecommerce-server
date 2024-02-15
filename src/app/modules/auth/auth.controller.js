const config = require("../../../config/config");
const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const AuthService = require("./auth.service");

const register = catchAsync(async (req, res, next) => {
  const result = await AuthService.registerService(req.body);
  const { accessToken, user } = result;

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully!",
    data: {
      user,
      accessToken,
    },
  });
});

const login = async (req, res, next) => {
  try {
    const result = await AuthService.loginService(req.body);
    const { accessToken, user } = result;

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User logged in successfully!",
      data: {
        user,
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  register,
};
