const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/',  restricted, checkDept("finance"), (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;


function checkDept (department) {
  return function (req, res, next) {
    if (department === req.decodedJwt.department){
      next()
    } else {
      res.status(403).json({message: "Can't touch this."})
    }
  }
}