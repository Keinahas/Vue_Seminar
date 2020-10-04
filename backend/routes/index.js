var express = require("express");
var router = express.Router();
const userModel = require("../odm/users");

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.render("index", { title: "Express" });
  userModel
    .find({}, { password: 0 })
    .then((result) => {
      res.status(200).json(result); // status와 정보를 보낼때 이용
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400); // status만 보낼때 이용
    });
});

module.exports = router;
