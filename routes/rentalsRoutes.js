const express = require("express");
const router = express.Router();

const rentalsControllers = require("../controllers/rentalsControllers");
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/home/rentals/issue", requireAuth, (req, res) =>
  rentalsControllers.issue_get(req, res)
);
router.get("/home/rentals/return_item", requireAuth, (req, res) =>
  rentalsControllers.return_item_get(req, res)
);

router.get("/home/rentals/tools", requireAuth, (req, res) =>
  rentalsControllers.tools_get(req, res)
);
router.get("/home/rentals", requireAuth, (req, res) =>
  rentalsControllers.rentels_get(req, res)
);

router.get("/home/rentals/register_tool", requireAuth, (req, res) =>
  rentalsControllers.register_tool_get(req, res)
);
router.post("/rentals/register_tool", requireAuth, (req, res) =>
  rentalsControllers.register_tool_post(req, res)
);

router.post("/rentals/rent_issue", requireAuth, (req, res) =>
  rentalsControllers.rent_issue_post(req, res)
);

router.get("/home/rentals/rental_details", requireAuth, (req, res) =>
  rentalsControllers.rental_details_get(req, res)
);
router.post("/rentals/return_item", requireAuth, (req, res) =>
  rentalsControllers.return_item_post(req, res)
);

router.get("/home/rentals/active_transections", requireAuth, (req, res) =>
  rentalsControllers.transections_get(req, res)
);

module.exports = router;
