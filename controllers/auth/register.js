const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const { User } = require("../../models");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(
      409,
      `User with ${email} already exist`
    );
  }
  const avatarURL = gravatar.url(email);
  const hashPasword = await bcrypt.hash(password, 10);
  const result = await User.create({
    ...req.body,
    password: hashPasword,
    avatarURL,
  });
  res.status(201).json({
    name: result.name,
    email: result.email,
    avatarURL,
  });
};

module.exports = register;
