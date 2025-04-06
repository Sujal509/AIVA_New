const { check } = require("express-validator");

exports.validateTrainneRegistration = [
    check("name").notEmpty().withMessage("Name is required"),
    check("empId").notEmpty().withMessage("Trainne ID is required"),
    check("batch").notEmpty().withMessage("Batch is required"),
    check("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),
    check("faceDescriptors")
        .isArray({ min: 1 })
        .withMessage("At least one face descriptor is required"),
];

exports.validateTrainneLogin = [
    check("empId").notEmpty().withMessage("Trainne ID is required"),
    check("password").notEmpty().withMessage("Password is required"),
];

exports.validateAdminLogin = [
    check("name").notEmpty().withMessage("Name is required"),
    check("password").notEmpty().withMessage("Password is required"),
];