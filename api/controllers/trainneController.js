const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { euclideanDistance } = require("../utils/distanceUtil");
const { addToBlacklist } = require("../utils/tokenBlacklist");
const { encryptDescriptor, decryptDescriptor } = require("../utils/cryptoUtil");
const Trainne = require("../models/Trainne");

const FACE_MATCH_THRESHOLD = 0.5;

exports.trainneRegister = async (req, res, next) => {
    try {
        const { name, empId, batch, subBatch, faceDescriptors } = req.body;

        const trainne = await Trainne.findOne({ empId });
        if (trainne) {
            return res.status(400).json({ msg: "Trainne already exists" });
        }
        const encryptedDescriptors = faceDescriptors.map(desc => encryptDescriptor(desc));

        const student = new Trainne({
            name,
            empId,
            batch,
            subBatch,
            faceDescriptors: encryptedDescriptors
        });

        await student.save();
        return res.status(201).json({ msg: "Trainne registered successfully" });
    } catch (err) {
        next(err);
    }
};



exports.trainneFaceLogin = async (req, res, next) => {
    try {
        const { faceDescriptors } = req.body;

        if (
            !faceDescriptors ||
            !Array.isArray(faceDescriptors) ||
            faceDescriptors.length !== 1 ||
            !Array.isArray(faceDescriptors[0]) ||
            faceDescriptors[0].length !== 128
        ) {
            return res.status(400).json({ msg: "Invalid descriptor data" });
        }

        const descriptorToMatch = faceDescriptors[0];

        const trainnes = await Trainne.find({});
        let matchedTrainne = null;

        for (const trainne of trainnes) {
            for (const encrypted of trainne.faceDescriptors) {
                if (typeof encrypted !== "string") continue;

                let storedDescriptor;
                try {
                    storedDescriptor = decryptDescriptor(encrypted);
                } catch (err) {
                    console.error("Decryption failed :- ", err.message);
                    continue;
                }

                const distance = euclideanDistance(storedDescriptor, descriptorToMatch);

                if (distance < FACE_MATCH_THRESHOLD) {
                    matchedTrainne = trainne;
                    break;
                }
            }

            if (matchedTrainne) break;
        }

        if (!matchedTrainne) {
            return res.status(401).json({ msg: "Face not recognized" });
        }

        const user = {
            id: matchedTrainne._id,
            name: matchedTrainne.name,
            empId: matchedTrainne.empId,
            batch: matchedTrainne.batch,
            subBatch: matchedTrainne.subBatch,
            role: "trainne"
        };

        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.status(200).json({ msg: "Login successful", token, user });

    } catch (err) {
        next(err);
    }
};



exports.trainneLogout = (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(400).json({ msg: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        addToBlacklist(token);

        return res.status(200).json({ msg: "Logout successful" });
    } catch (err) {
        next(err);
    }
};