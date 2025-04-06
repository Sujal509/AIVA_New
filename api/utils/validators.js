const { check } = require("express-validator");

exports.validateTrainneRegistration = [
    check("name")
        .trim()
        .notEmpty()
        .withMessage("name is required"),
    check("empId")
        .trim()
        .notEmpty()
        .withMessage("empId is required"),
    check("batch")
        .trim()
        .notEmpty()
        .withMessage("batch is required"),
    check("subBatch")
        .trim()
        .notEmpty()
        .withMessage("subBatch is required"),
    check("password")
        .isLength({ min: 8 })
        .withMessage("password must be at least 8 characters"),
    check("faceDescriptors")
        .isArray({ min: 1 })
        .withMessage("At least one face descriptor is required"),
    check("faceDescriptors.*")
        .isArray({ min: 128, max: 128 })
        .withMessage("Each face descriptor must be an array of 128 numbers")
];

exports.validateTrainneLogin = [
    check("empId")
        .trim()
        .notEmpty()
        .withMessage("empId is required"),
    check("faceDescriptors")
        .isArray({ min: 1 })
        .withMessage("At least one face descriptor is required"),
    check("faceDescriptors.*")
        .isArray({ min: 128, max: 128 })
        .withMessage("Each face descriptor must be an array of 128 numbers")
];


exports.validateAdminLogin = [
    check("name").notEmpty().withMessage("name is required"),
    check("password").notEmpty().withMessage("password is required"),
];