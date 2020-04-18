const express = require("express");
const router = express.Router();
const Joi = require("joi");

const db = require("../db");
const messages = db.get("messages");

const schema = Joi.object().keys({
  nome: Joi.string()
    .min(3)
    .max(50)
    .required(),
  indirizzo: Joi.string()
    .min(5)
    .max(100)
    .required(),
  latitudine: Joi.number().required(),
  longitudine: Joi.number().required(),
  telefono: Joi.number().required(),
  spesa: Joi.string()
    .min(3)
    .max(500)
    .required()
});

router.get("/", (req, res) => {
  messages.find().then(allMessages => {
    res.json(allMessages);
  });
});

router.get("/:id", (req, res) => {
  messages.find(req.params.id).then(message => {
    res.json(message);
  });
});

router.post("/", (req, res, next) => {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    const {
      nome,
      indirizzo,
      latitudine,
      longitudine,
      telefono,
      spesa
    } = req.body;
    const messaggio = {
      nome: nome,
      indirizzo: indirizzo,
      latitudine: latitudine,
      longitudine: longitudine,
      telefono: telefono,
      spesa: spesa,
      date: new Date()
    };
    messages
      .insert(messaggio)
      .then(messaggioInserito => res.json(messaggioInserito))
      .catch(err => next(err));
  } else {
    console.log("Errore post request");
    res.status(400).json();
  }
});

router.delete("/", (req, res, next) => {
  var id = req.body._id;
  messages
    .findOneAndDelete({ _id: id })
    .then(result => {
      if (result == null) {
        res.status(400).json({ error: "message not found" });
        console.log("item was not found...");
      } else {
        res.json(result);
        console.log("item deleted correctly");
      }
    })
    .catch(err => {
      next(err);
    });
});

router.delete("/:id", (req, res, next) => {
  var id = req.params.id;
  messages
    .findOneAndDelete({ _id: id })
    .then(result => {
      if (result == null) {
        res.status(400).json({ error: "message not found" });
        console.log("item was not found...");
      } else {
        res.json(result);
        console.log("item deleted correctly");
      }
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
