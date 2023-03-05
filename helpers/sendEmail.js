const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { GRID_API_KEY } = process.env;

sgMail.setApiKey(GRID_API_KEY);

const sendEmail = async (data) => {
  try {
    const email = {
      ...data,
      from: "parazyt2010@gmail.com",
    };
    await sgMail.send(email);
    return true;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports = sendEmail;
