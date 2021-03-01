const fs = require("fs");
const { promises: fsPromises } = fs;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const contactList = fs.readFileSync(contactsPath, "utf-8");

const contactsItems = JSON.parse(contactList);

const listContacts = async () => {
  return contactsItems;
};

const getContactById = async (contactId) => {
  const contactById = await contactsItems.find((el) => el.id === contactId);
  return contactById;
};

const removeContact = async (contactId) => {
  const newContacts = contactsItems.filter((el) => el.id !== contactId);
  fsPromises.writeFile(
    contactsPath,
    JSON.stringify(newContacts),
    "utf-8",
    (err) => {
      if (err) {
        return console.log(err);
      }
    }
  );
  return newContacts;
};

const addContact = async (body) => {
  const { name, email, phone } = await body;
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  const newContactsList = [...contactsItems, newContact];
  fsPromises.writeFile(
    contactsPath,
    JSON.stringify(newContactsList),
    "utf-8",
    (err) => {
      if (err) {
        return console.log(err);
      }
    }
  );

  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = await body;
  const contacts = await contactsItems.find((el) => {
    const { id } = el;
    if (id === contactId) {
      el.name = name;
      el.email = email;
      el.phone = phone;
      return el;
    }
  });
  fsPromises.writeFile(
    contactsPath,
    JSON.stringify(contactsItems),
    "utf-8",
    (err) => {
      if (err) {
        return console.log(err);
      }
    }
  );
  return contacts;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
