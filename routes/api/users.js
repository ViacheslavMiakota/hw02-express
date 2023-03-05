const express = require("express");

const {
  authenticate,
  upload,
  ctrlWrapper,
} = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");

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

module.exports = router;
