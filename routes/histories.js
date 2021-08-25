const router = require("express").Router();
const User = require("../models/User");
const History = require("../models/History");

//CREATE History
router.post("/", async (req, res) => {
  const newHistory = new History(req.body);
  try {
    const savedHistory = await newHistory.save();
    res.status(200).json(savedHistory);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE History
router.put("/:id", async (req, res) => {
  console.log(req.body)
  try {
    const history = await History.findById(req.params.id);
      try {
        const updatedHistory = await History.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedHistory);
      } catch (err) {
        res.status(500).json(err);
      }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE History
router.delete("/:id", async (req, res) => {
  try {
    const history = await History.findById(req.params.id);
      try {
        await history.delete();
        res.status(200).json("History has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET History
router.get("/:id", async (req, res) => {
  try {
    const history = await History.findById(req.params.id);
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL HistoryS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let Histories;
    if (username) {
      Histories = await History.find({ username });
    } else if (catName) {
      Histories = await History.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      Histories = await History.find();
    }
    res.status(200).json(Histories);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
