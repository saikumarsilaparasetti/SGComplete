const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/inventory",requireAuth, (req, res) =>
  inventoryController.inventory_get(req, res)
);

router.post("/inventory",requireAuth, (req, res) =>
  inventoryController.inventory_post(req, res)
);

module.exports = router;
