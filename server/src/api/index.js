const express = require("express");
const messages = require("./messages");
const users = require("./users");

const router = express.Router();

// API ROUTES:
router.use("/messages", messages);
router.use("/users", users);

module.exports = router;
