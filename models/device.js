const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema(
    {
        deviceId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },

        deviceName: {
            type: String,
            default: "Unnamed Device",
        },

        online: {
            type: Boolean,
            default: false,
        },

        lastSeen: {
            type: Date,
            default: Date.now,
        },

        data: {
            voltage: Number,
            current: Number,
            frequency: Number,
            activePower: Number,
            reactivePower: Number,
            apparentPower: Number,
            powerFactor: Number,
            cosPhi: Number,
            temperature: Number,
            thdVoltage: Number,
            thdCurrent: Number,
            importActiveEnergy: Number,
            exportActiveEnergy: Number,
            alarmStatus: Number,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Device", DeviceSchema);