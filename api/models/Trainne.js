const mongoose = require("mongoose");

const faceDescriptorSchema = new mongoose.Schema({
    descriptor: { type: [Number], required: true },
});

const trainneSchema = new mongoose.Schema({
    name: { type: String, required: true },
    empId: { type: String, required: true, unique: true },
    batch: { type: String, required: true },
    subBatch: { type: String, required: true },
    password: { type: String, required: true },
    faceDescriptors: [faceDescriptorSchema],
    role: { type: String, required: true, default: "trainne" }
});

module.exports = mongoose.model("Trainne", trainneSchema);