const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const config = require("../../../config/config");

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      length: [11, "Phone number must be 11 digits"],
      required: true,
      // unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // role: {
    //   type: String,
    //   default: "user",
    // },
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
