const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const option = { expiresIn: "2h", issuer: "node-seminar", subject: "userInfo" };

module.exports = {
  createToken(payload) {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, SECRET_KEY, option, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },
  decodeToken(token) {
    return new Promise((resolve, reject) => {
      if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
          if (err) reject(err);
          else resolve(decoded);
        });
      } else {
        reject(new Error("Not Signed In."));
      }
    });
  },
};
