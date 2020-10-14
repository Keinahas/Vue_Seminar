const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  position: { type: String },
  contact: { type: String, required: true },
  at: { type: String, default: "Lab" },
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: new Date() },
  nowAt: { type: String },
});

userSchema.pre("save", function (next) {
  bcrypt
    .genSalt()
    .then((salt) => {
      bcrypt.hash(this.password, salt, (err, hashed) => {
        if (err) next(err);
        this.password = hashed;
        next();
      });
    })
    .catch((err) => {
      next(err);
    });
});

userSchema.methods.comparePassword = function (plaintext, next) {
  bcrypt
    .compare(plaintext, this.password)
    .then((isMatched) => {
      next(null, isMatched);
    })
    .catch((err) => next(err));
};

module.exports = mongoose.model("user", userSchema);
