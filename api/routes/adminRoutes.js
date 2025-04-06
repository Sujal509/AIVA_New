const { check, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const {validateAdminLogin} = require("../utils/validators");

const { adminLogin } = require("../controllers/adminController");
const { postAnnouncement } = require("../controllers/adminController");


const runValidation = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
	next();
};

router.post("/login", validateAdminLogin, runValidation, adminLogin);
router.post("/announcement", auth, isAdmin, postAnnouncement);

module.exports = router;