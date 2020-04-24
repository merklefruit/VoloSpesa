const express = require("express");
const messages = require("./messages");
const users = require("./users");

const router = express.Router();

// router.get("/", (req, res) => {
//   res.json({
//     message: "API - 👋🌎🌍🌏"
//   });
// });

router.use("/messages", messages);
router.use("/users", users);

module.exports = router;
