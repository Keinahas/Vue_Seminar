var express = require("express");
var router = express.Router();
const userModel = require("../odm/users");

/* GET users listing. */
router.get("/", function (req, res, next) {
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

router.post("/", function (req, res) {
  userModel
    .create(req.body)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

router.patch("/:id", function (req, res) {
  userModel
    .updateOne({ id: req.params.id }, req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

router.delete("/:id", function (req, res) {
  userModel
    .deleteOne({ id: req.params.id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

module.exports = router;
