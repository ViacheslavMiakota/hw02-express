const { User } = require("../../models");

const { HttpError, sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "Not found");
  }
  if (user.verify) {
    throw HttpError(400, "User alredy verify");
  }
  const mail = {
    to: email,
    subject: "Підтвердити пошту",
    html: `<a href="http://localhost:3000/api/auth/verify/${user.verificationToken}" target="_blank">Нажміть щоб підтвердити email </a>`,
  };
  await sendEmail(mail);
  res.json({
    message: "Email verify resend",
  });
};

module.exports = resendVerifyEmail;
