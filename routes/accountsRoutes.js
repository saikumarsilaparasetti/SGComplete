const express = require("express");
const router = express.Router();
const { checkUser, requireAuth } = require("../middleware/authMiddleware");
const accountsConatroller = require("../controllers/accountsControllers");

router.get("/home/accounts/debit_issue", requireAuth, (req, res) =>
  accountsConatroller.debit_issue_get(req, res)
);
router.post("/debit_issue", requireAuth, (req, res) =>
  accountsConatroller.debit_issue_post(req, res)
);

router.get("/home/accounts/create_account", requireAuth, (req, res) =>
  accountsConatroller.create_account_get(req, res)
);

router.post("/create_account", requireAuth, (req, res) =>
  accountsConatroller.create_account_post(req, res)
);

router.get("/home/accounts/customer", requireAuth, async (req, res) => {
  accountsConatroller.customer_get(req, res);
});

// router.get("/customers", (req, res) => authController.get_customers(req, res));
router.get("/home/accounts/customers", requireAuth, (req, res) =>
  accountsConatroller.customers_get(req, res)
);

router.get("/home/accounts/transections", requireAuth, (req, res) =>
  accountsConatroller.transections_get(req, res)
);

router.get("/home/accounts", requireAuth, (req, res) =>
  accountsConatroller.accounts_get(req, res)
);
router.get("/home/accounts/check_account", requireAuth, (req, res) =>
  accountsConatroller.check_account_get(req, res)
);

router.get('/home/accounts/debit_pay', requireAuth, (req, res)=>accountsConatroller.debit_pay_get(req, res))

router.post('/accounts/payment', requireAuth, (req, res)=> accountsConatroller.payment_post(req, res));

router.get('/error', requireAuth, (req, res)=>accountsConatroller.error_get(req, res))

module.exports = router;


