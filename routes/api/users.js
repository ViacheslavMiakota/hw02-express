const express = require("express");

const {
  authenticate,
  validation,
  upload,
  ctrlWrapper,
} = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");

const { verifyEmailSchema } = require("../../models/user");
const router = express.Router();

router.get(
  "/current",
  authenticate,
  ctrlWrapper(ctrl.getCurrent)
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);
router.get(
  "/verify/:verificationToken",
  ctrlWrapper(ctrl.verifyEmail)
);

router.post(
  "/verify",
  validation(verifyEmailSchema),
  ctrlWrapper(ctrl.resendVerifyEmail)
);

module.exports = router;
