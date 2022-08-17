const Events = require("../model/event_model");

const createEvent = async(req, res) => {
    console.log(req.body);
    const event = await Events.create(req.body);
    res.status(200).send("Event Created");

};

const getEvent = async(req, res) => {
    const _id = req.params.id;
    const event = await Events.findOne({ _id });
    res.status(200).send(event);
};

const getAllEvents = async(req, res) => {
    const events = await Events.find();
    res.status(200).send(events);
};


const getAllEventsForUser = async(req, res) => {
    const userId = req.params.id;
    const events = await Events.find({ userId });
    res.status(200).send(events);
};


const deleteEvent = async(req, res) => {
    const _id = req.params.id;
    const userId = req.body.userId;
    const event = await Events.deleteOne({ _id, userId });
    res.status(200).send(event);
};


module.exports = { createEvent, getEvent, getAllEvents, deleteEvent, getAllEventsForUser };