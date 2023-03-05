const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { User } = require("../../models");
const { HttpError, sendEmail } = require("../../helpers");

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
  const verificationToken = nanoid();

  const result = await User.create({
    ...req.body,
    password: hashPasword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Підтвердити пошту",
    html: `<a href="http://localhost:3000/api/auth/verify/${verificationToken}" target="_blank">Нажміть щоб підтвердити email </a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    name: result.name,
    email: result.email,
    avatarURL,
    verificationToken,
  });
};

module.exports = register;
