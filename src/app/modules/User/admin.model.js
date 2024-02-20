const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const config = require("../../../config/config");

const adminSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

adminSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  ); //

  next();
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
