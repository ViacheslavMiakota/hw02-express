const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

// const nodemailer = require("nodemailer");
// const { META_PASSWORD } = process.env;

const authRouter = require("./routes/api/auth");
const usersRouter = require("./routes/api/users");
const contactsRouter = require("./routes/api/contacts");

const app = express();

// const nodemailerConfig = {
//   host: "smtp.meta.ua",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "viacheslavmiakota@meta.ua",
//     pass: META_PASSWORD,
//   },
// };

// const transporter = nodemailer.createTransport(
//   nodemailerConfig
// );

// const email = {
//   to: "parazyt2010@gmail.com",
//   from: "viacheslavmiakota@meta.ua",
//   subject: "Перший лист",
//   html: "Усім привітики",
// };

// transporter
//   .sendMail(email)
//   .then(() => console.log("Email send sucess"))
//   .catch((error) => console.log(error.message));

const formatsLogger =
  app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
