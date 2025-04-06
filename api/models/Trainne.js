const mongoose = require("mongoose");

const trainneSchema = new mongoose.Schema({
    name: { type: String, required: true },
    empId: { type: String, required: true, unique: true },
    batch: { type: String, required: true },
    subBatch: { type: String, required: true },
    faceDescriptors: {
        type: [String],
        required: true,
        validate: [array => array.length > 0, "At least one face descriptor is required"]
    },

    role: { type: String, required: true, default: "trainne" }
}, { timestamps: true });


module.exports = mongoose.model("Trainne", trainneSchema);