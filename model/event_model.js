const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Event title must be included"],
        min: [3, "Title length must be larger than 2 characters"]
    },

    description: {
        type: String,
        required: [true, "Event description must be included"],
        min: [11, "Description length must be larger than 10 characters"]
    },
    date: {
        type: Date,
        required: [true, "Event date must be included"],
    },
    userId: {
        type: String,
        required: [true, "User id must be provided"],
    },
    joiners: {
        type: Number,
        default: 0

    }

});

module.exports = mongoose.model("eventInfo", eventSchema);