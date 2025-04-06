const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const { trainneRegister, trainneFaceLogin } = require("../controllers/trainneController");
const { validateTrainneRegistration, validateTrainneLogin } = require("../utils/validators");

const runValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.post("/register", validateTrainneRegistration, runValidation, trainneRegister);
router.post("/login", validateTrainneLogin, runValidation, trainneFaceLogin);

module.exports = router;