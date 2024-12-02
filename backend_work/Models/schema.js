const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    uid: {
        type: Number,
        required: true,
        unique: true
    },
    filesPath: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    way: {
        type: String,
        required: true
    }
});

const eventGenerated = new Schema({
    uid: {
        type: Number,
        required: true,
        unique: true
    },
    eventName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        min: 6000000000,
        max: 9999999999,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true
    },
    way: {
        type: String,
        required: true
    }
});

const Events = mongoose.model("Event", eventGenerated);
const Users = mongoose.model('User', userSchema);
module.exports = { Events, Users }
