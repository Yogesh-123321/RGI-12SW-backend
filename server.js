const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const Device = require("./models/Device");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();
connectDB();
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());
io.on("connection", async (socket) => {

    console.log("🟢 Client Connected :", socket.id);

    try {

        const devices = await Device.find({});

        socket.emit("initialData", devices);

    } catch (err) {

        console.log(err);

    }

    socket.on("disconnect", () => {

        console.log("🔴 Client Disconnected :", socket.id);

    });

});
app.get("/", (req, res) => {
    res.send("Relay Backend Running");
});
app.get("/api/device", async (req, res) => {

    try {

        const devices = await Device.find({});

        res.json(devices);

    }

    catch (err) {

        res.status(500).json({

            message: err.message,

        });

    }

});
app.post("/api/device/update", async (req, res) => {

    try {

        const payload = req.body;

        const device = await Device.findOneAndUpdate(

    {
        deviceId: payload.deviceId,
    },

    {
        deviceId: payload.deviceId,
        online: payload.online,
        lastSeen: payload.timestamp,
        data: payload.data,
    },

    {
        upsert: true,
        new: true,
    }

);

        console.clear();

        console.log("=================================");
        console.log("DEVICE UPDATED");
        console.log("=================================");
        console.log(payload.deviceId);
        io.emit("deviceUpdate", device);
        res.json({
            success: true,
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }

});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});