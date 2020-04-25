const express = require("express");
const router = express.Router();
const Joi = require("joi");

const db = require("../db");
const users = db.get("users");

const userSchema = Joi.object().keys({
  nome: Joi.string()
    .min(3)
    .max(50)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  indirizzo: Joi.string()
    .min(5)
    .max(100)
    .required(),
  latitudine: Joi.number().required(),
  longitudine: Joi.number().required(),
  telefono: Joi.number()
});

router.get("/", (req, res) => {
  users.find().then(allUsers => {
    res.json(allUsers);
  });
});

router.get("/:id", (req, res) => {
  users.find(req.params.id).then(user => {
    res.json(user);
  });
});

router.post("/", (req, res, next) => {
  const result = Joi.validate(req.body, userSchema);
  if (result.error === null) {
    const {
      nome,
      email,
      indirizzo,
      latitudine,
      longitudine,
      telefono
    } = req.body;
    const user = {
      nome: nome,
      email: email,
      indirizzo: indirizzo,
      latitudine: latitudine,
      longitudine: longitudine,
      telefono: telefono,
      date: new Date()
    };
    users
      .insert(user)
      .then(userAdded => res.json(userAdded))
      .catch(err => next(err));
  } else {
    console.log("Errore post request");
    res.status(400).json();
  }
});

router.delete("/", (req, res, next) => {
  var id = req.body._id;
  users
    .findOneAndDelete({ _id: id })
    .then(result => {
      if (result == null) {
        res.status(400).json({ error: "user not found" });
      } else {
        res.json(result);
      }
    })
    .catch(err => {
      next(err);
    });
});

router.delete("/:id", (req, res, next) => {
  var id = req.params.id;
  users
    .findOneAndDelete({ _id: id })
    .then(result => {
      if (result == null) {
        res.status(400).json({ error: "user not found" });
      } else {
        res.json(result);
      }
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
