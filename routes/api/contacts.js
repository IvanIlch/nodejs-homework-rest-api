const express = require("express");
const path = require("path");
const fs = require("fs");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../model/index");
const router = express.Router();

const contactsPath = path.join(__dirname, "../../model/contacts.json");

const contactList = fs.readFileSync(contactsPath, "utf-8");

const contactsItems = JSON.parse(contactList);

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = await req.params;
  const contact = await getContactById(Number(contactId));
  res.json({
    status: "success",
    code: 200,
    data: { contact },
  });
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const contact = await addContact(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "missing required name field" });
  }
  res.status(201).json({
    status: "success",
    code: 201,
    data: { contact },
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = await req.params;
  const contacts = removeContact(Number(contactId));
  res.json({
    status: "success",
    code: 200,
    data: { message: "contact deleted" },
  });
  if (contacts.length === contactsItems.length) {
    return res.status(404).json({ message: "Not found" });
  }
});

router.patch("/:contactId", async (req, res, next) => {
  const { contactId } = await req.params;
  const body = req.body;
  const contact = await updateContact(Number(contactId), body);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({
    status: "success",
    code: 200,
    data: { message: "contact updated" },
  });
});

module.exports = router;
