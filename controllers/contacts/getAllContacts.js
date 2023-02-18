const contactsOperations = require("../../models/contacts");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts =
      await contactsOperations.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
