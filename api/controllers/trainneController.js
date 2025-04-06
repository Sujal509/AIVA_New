const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { euclideanDistance } = require("../utils/distanceUtil");
const { addToBlacklist } = require("../utils/tokenBlacklist");
const Trainne = require("../models/Trainne");

const FACE_MATCH_THRESHOLD = 0.45;

exports.trainneRegister = async (req, res, next) => {
    try {
        const { name, empId, batch, subBatch, password, faceDescriptors } = req.body;

        const trainne = await Trainne.findOne({ empId });
        if (trainne) return res.status(400).json({ msg: "Trainne already exists" });

        const hashedPwd = await bcrypt.hash(password, 12);

        const student = new Trainne({
            name,
            empId,
            batch,
            subBatch,
            password: hashedPwd,
            faceDescriptors: faceDescriptors.map(desc => ({ descriptor: desc }))
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

        if (!faceDescriptors || !Array.isArray(faceDescriptors) /*|| descriptor.length !== 128*/) {
            return res.status(400).json({ msg: "Invalid descriptor data" });
        }

        const trainnes = await Trainne.find({});

        let matchedTrainne = null;

        for (const trainne of trainnes) {
            const distance = euclideanDistance(faceDescriptors, trainne.faceDescriptors);
            if (distance < FACE_MATCH_THRESHOLD) {
                matchedTrainne = trainne;
                break;
            }
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

        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1hr" });

        return res.status(200).json({ msg: "Login successful", token, user });

    } catch (err) {
        next(err);
    }
};


exports.trainneLogout = (req, res,next) => {
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