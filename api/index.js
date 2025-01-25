const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const { authroutes } = require("../routes/auth-routes");

dotenv.config();

const app = express();
const MONGOURL = process.env.MONGO_URL;

// Middleware
app.use(express.json());

// Updated CORS Configuration
const corsOptions = {
    origin: ["https://smit-hackathon-project.netlify.app"], // Add frontend origin here
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Include cookies if necessary
};
app.use(cors(corsOptions));

// MongoDB Connection
mongoose
    .connect(MONGOURL)
    .then(() => {
        console.log("MONGO_DB Connected");
    })
    .catch((e) => {
        console.log("MongoDB Connection Error: ", e.message);
    });

// Routes
app.use("/auth", authroutes);

app.options("*", cors(corsOptions)); // Handle preflight requests

app.get("/", (req, res) => {
    res.json({ message: "Server Running" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
