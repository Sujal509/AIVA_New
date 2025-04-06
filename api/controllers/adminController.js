const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

exports.adminLogin = async (req, res, next) => {
    try {
        const { name, password } = req.body;
        const admin = await Admin.findOne({ name });

        if (!admin) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const payload = {
            id: admin._id,
            name: admin.name,
            role: admin.role
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1hr" });

        return res.status(200).json({ msg: "Login successful", user:payload, token });
    } catch (err) {
        next(err);
    }
};

exports.postAnnouncement = (req, res, next) => {
    try {
        const { title, message } = req.body;
        const io = req.app.get("io");

        const announcement = {
            title,
            message,
            time: new Date()
        };

        io.emit("new-announcement", announcement);

        res.status(200).json({
            msg: "Announcement sent successfully",
            announcement
        });
    } catch (err) {
        next(err);
    }
};
