const express = require("express");
const authmiddleware = require("../middleware/authentication");
const { createEvent, getEvent, getAllEvents, deleteEvent, getAllEventsForUser } = require("../controllers/events_controller");
const router = express.Router();

router.post("/create-events", authmiddleware, createEvent);
router.get("/events", authmiddleware, getAllEvents);
router.get("/events/user/:id", authmiddleware, getAllEventsForUser);
router.get("/event/:id", authmiddleware, getEvent);
router.delete("/event/:id", authmiddleware, deleteEvent);
module.exports = router;