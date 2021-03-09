const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../model/index");

router.get("/", async (req, res, next) => {
  try {
    const data = await listContacts();
    res.json({
      status: "success",
      code: 200,
      data: { data },
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const data = await getContactById(id);
    res.json({
      status: "success",
      code: 200,
      data: { data },
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const contact = await addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: { body },
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId);
    res.json({
      status: "success",
      code: 200,
      data: { message: "contact deleted" },
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

router.patch("/:contactId", async (req, res, next) => {
  try {
    const update = await updateContact(req.params.contactId, req.body);
    console.log(update);
    res.json({
      status: "success",
      code: 200,
      data: { update },
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

module.exports = router;
