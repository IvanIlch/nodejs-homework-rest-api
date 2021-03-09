const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contact = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 70,
    },
    email: {
      type: String,
      minlength: 3,
      maxlength: 170,
    },
    phone: {
      type: String,
      minlength: 3,
      maxlength: 170,
    },
    subscription: {
      type: String,
      minlength: 3,
      maxlength: 170,
    },
    password: {
      type: String,
      minlength: 3,
      maxlength: 170,
    },
    token: {
      type: String,
      minlength: 0,
      maxlength: 170,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = mongoose.model("contact", contact);

module.exports = Contact;
