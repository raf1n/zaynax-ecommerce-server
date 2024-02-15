const config = require("../../../config/config");
const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const AuthService = require("./auth.service");

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
};
