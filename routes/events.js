const router = require("express").Router();
const User = require("../models/User");
const Event = require("../models/Event");

//CREATE Event
router.post("/", async (req, res) => {
  const newEvent = new Event(req.body);
  try {
    const savedEvent = await newEvent.save();
    res.status(200).json(savedEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE Event
router.put("/:id", async (req, res) => {
  console.log(req.body)
  try {
    const Event = await Event.findById(req.params.id);
    if (Event.username === req.body.username) {
      try {
        const updatedEvent = await Event.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedEvent);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your Event!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE Event
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
      try {
        await event.delete();
        res.status(200).json("Event has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Event
router.get("/:id", async (req, res) => {
  try {
    const Event = await Event.findById(req.params.id);
    res.status(200).json(Event);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL EventS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let Events;
    if (username) {
      Events = await Event.find({ username });
    } else if (catName) {
      Events = await Event.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      Events = await Event.find();
    }
    res.status(200).json(Events);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
