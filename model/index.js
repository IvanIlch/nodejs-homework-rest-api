const Contact = require("../schemas/contact");

const listContacts = async () => {
  return Contact.find();
};

const getContactById = async (contactId) => {
  return Contact.findOne({ _id: contactId });
};

const removeContact = async (contactId) => {
  return Contact.findByIdAndRemove({ _id: contactId });
};

const addContact = async (body) => {
  const { name, email, phone, subscription, password, token } = await body;
  const contact = await Contact.create({
    name,
    email,
    phone,
    subscription,
    password,
    token,
  });
  return contact;
};

const updateContact = async (contactId, body) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
