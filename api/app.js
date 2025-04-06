require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan")
const trainneRoutes = require("./routes/trainneRoutes");
const adminRoutes = require("./routes/adminRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(cors({origin:"*"}));
app.use(helmet());
app.use(morgan("dev"));


app.use("/api/admin", adminRoutes);
app.use("/api/trainne", trainneRoutes);
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
        console.log("Database connected ✔");
        app.listen(process.env.PORT, () => {
            console.log(`API is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error(`Error from mongoose --> ${err.message}`);
    });