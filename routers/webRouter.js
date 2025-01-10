const express = require("express");
const router = express.Router();
const webController = require("../controllers/webController");

router.get("/", webController.index);
router.get("/:id", webController.show);

module.exports = router;
